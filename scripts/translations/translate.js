require('dotenv').config();
const fs = require('fs');
const path = require('path');
const docusaurusConfig = require('../../docusaurus.config.js');
const cliProgress = require('cli-progress');
const yaml = require('js-yaml');

const crypto = require('crypto');
const {execSync} = require('child_process');

const { copyNonDocs } = require('./copy-non-md');
const { translateText } = require('./translate-text');

const getProperties = (doc) => {
    // get everything between the first set of --- and the second set of ---
    const frontMatter = doc.match(/---([\s\S]*?)---/)[1];
    if(!frontMatter) return {};
    return yaml.load(frontMatter);
};

// TODO: implement
const DO_NOT_TRANSLATE = [
    'Web3',
    'Ethereum',
    'EOS',
    'EVM'
];

const SYMBOL_TYPE = {
    TITLE: 'title',
    METADATA: 'metadata',
    IGNORED: 'ignored',
    TEXT: 'text',
    LINK: 'link',
}

let symbols = [];

const pushSymbol = (type, content) => {
    symbols.push({
        type,
        content
    });
}

const finalizeTranslation = (translated) => {
    translated = translated.replace(/！/g, '!');
}


const translate = async (doc, targetLanguageCode) => {

    splitDocIntoSymbols(doc);

    const frontMatter = getProperties(doc);
    console.log('frontMatter', frontMatter);

    let translatedTitle = symbols.find(symbol => symbol.type === SYMBOL_TYPE.TITLE).content;
    if (!frontMatter['dont_translate_title']) {
        translatedTitle = await translateText(symbols.find(symbol => symbol.type === SYMBOL_TYPE.TITLE).content, targetLanguageCode);
    }

    symbols = symbols.filter(symbol => symbol.type !== SYMBOL_TYPE.TITLE);

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(symbols.length, 0);

    const translatedSymbols = [];
    let symbolIndex = 0;
    for(const symbol of symbols){
        progressBar.update(++symbolIndex);

        if(symbol.type === SYMBOL_TYPE.METADATA){
            const translated = symbol.content.replace(/title:\s*(.+)/, `title: ${translatedTitle}`);
            translatedSymbols.push(translated);
            continue;
        }

        if(symbol.type === SYMBOL_TYPE.LINK){
            let linkText = symbol.content.match(/\[(.+)\]/);

            // Some links have no text, so we'll just use the URL
            if(!linkText || !linkText.length){
                translatedSymbols.push(symbol.content);
                continue;
            }
            linkText = linkText[1];
            const translatedLinkText = await translateText(linkText, targetLanguageCode);
            if(!translatedLinkText){
                console.error(`Translation failed for symbol: ${symbol}`);
                translatedSymbols.push(symbol.content);
                continue;
            } else {
                translatedSymbols.push(symbol.content.replace(linkText, translatedLinkText));
            }

            continue;
        }


        if(symbol.type === SYMBOL_TYPE.IGNORED){
            translatedSymbols.push(symbol.content);
            continue;
        }

        if(!symbol || !symbol.content || !symbol.content.length){
            console.warn('Symbol is invalid or has empty content', symbol);
            continue;
        }

        if(symbol.content.match(/^[^a-zA-Z0-9]+$/)){
            translatedSymbols.push(symbol.content);
            continue;
        }

        // There's an issue where the Translate API removes trailing
        // whitespaces, and there's no way to prevent this with configs afaik.
        // To solve it, we'll add a whitespace to the end of the string
        // if it was terminated by a whitespace, and one doesn't exist in the
        // translated string.
        const terminatedByWhitespace = symbol.content.endsWith(' ');

        let translated = await translateText(symbol.content, targetLanguageCode);
        if(translated){
            if(terminatedByWhitespace && !translated.endsWith(' ')){
                translated += ' ';
            }

            finalizeTranslation(translated);
            translatedSymbols.push(translated);
        } else {
            console.error(`Translation failed for symbol: ${symbol}`)
        }

        await new Promise(resolve => setTimeout(resolve, 200));
    }

    return translatedSymbols.join('');
}

const getAllDocs = (dir) => {
    let files = [];
    const iterateFiles = (_files, _path = "") => {
        _files.map(file => {
            if(!path.extname(file)){
                iterateFiles(fs.readdirSync(path.join(dir, _path, file)), _path + '/' + file);
            }
            else if(path.extname(file) === '.md'){
                files.push(path.normalize(path.join(dir, _path, file)).replace(/\\/g, '/'));
            }
        });
    }

    iterateFiles(fs.readdirSync(dir));

    return files;
}



const splitDocIntoSymbols = (doc) => {
    symbols = [];

    let title = doc.match(/title:\s*(.+)/);
    if(title) title = title[0].replace('title:', '').trim();
    pushSymbol(SYMBOL_TYPE.TITLE, title);

    const secondIndex = doc.indexOf('---', doc.indexOf('---') + 1);
    const everythingBefore = doc.substring(0, secondIndex + 3);
    const everythingAfter = doc.substring(secondIndex + 3);
    pushSymbol(SYMBOL_TYPE.METADATA, everythingBefore);

    markdownToSymbols(everythingAfter);
}


const markdownToSymbols = (markdown) => {
    let result = [];
    const regexes = {
        head: new RegExp(/<head>([\s\S]*?)<\/head>/),
        codeBlock: new RegExp(/```[\s\S]*?```/),
        codeSnippet: new RegExp(/`[^`]*`/),
        image: new RegExp(/!\[[^\]]*]\([^)]*\)/),
        // matches markdown links (will include images, must be done after image search)
        link: new RegExp(/\[[^\]]*]\([^)]*\)/),
        // matches custom ignores, used in MDX
        ignored: new RegExp(/<!-- translation-ignore -->[\s\S]*?<!-- end-translation-ignore -->/),
        // finds only the |---|---| part of the table, doesn't attempt to match the content
        tableSplitter: new RegExp(/\|[-]+\|[-]+\|/),
        // matches only the > in the quotes, not the following texts
        blockquote: new RegExp(/>(?=\s)/g),
        summaryElement: new RegExp(/<summary>|<\/summary>/g),
        detailsElement: new RegExp(/<details>|<\/details>/g),
    }
    const combinedRegex = Object.values(regexes).reduce((acc, regex) => {
        return new RegExp(`${acc.source}|${regex.source}`, 'gs');
    });

    let foundSymbols = [];

    const pushFoundSymbol = (type, content) => {
        foundSymbols.push({ type, content });
    }

    let matches = markdown.match(combinedRegex);
    if(matches) {
        matches.forEach((match, i) => {
            if (match.match(/<head>([\s\S]*?)<\/head>/)) {
                pushFoundSymbol(SYMBOL_TYPE.HEAD, match);
            }
                // image is too similar to link, needs to be ignored
            // before looking for links
            else if (match.match(/!\[[^\]]*]\([^)]*\)/g)) {
                pushFoundSymbol(SYMBOL_TYPE.IGNORED, match);
            } else if (match.match(/\[[^\]]*]\([^)]*\)/g)) {
                pushFoundSymbol(SYMBOL_TYPE.LINK, match);
            } else {
                pushFoundSymbol(SYMBOL_TYPE.IGNORED, match);
            }
        });
    }

    let lastIndex = 0;
    for(const foundSymbol of foundSymbols){
        const index = markdown.indexOf(foundSymbol.content, lastIndex);
        if(index > lastIndex) {
            result.push({ type: SYMBOL_TYPE.TEXT, content: markdown.substring(lastIndex, index) });
        }

        result.push(foundSymbol);
        lastIndex = index + foundSymbol.content.length;
    }

    if(lastIndex < markdown.length){
        result.push({ type: SYMBOL_TYPE.TEXT, content: markdown.substring(lastIndex) });
    }

    for(const symbol of result){
        pushSymbol(symbol.type, symbol.content);
    }

    // console.log(JSON.stringify(symbols, null, 4));
    // process.exit(1);
}

const saveCache = (translationCache) => fs.writeFileSync('./translations/translated.json', JSON.stringify(translationCache, null, 2));
// const saveCache = (translationCache) => {}

const translateUI = async (languages, translationCache) => {
    execSync('npm run write-translations');
    const codeJson = JSON.parse(fs.readFileSync('./i18n/en/code.json', 'utf8'));
    const codeHash = crypto.createHash('md5').update(JSON.stringify(codeJson)).digest('hex');

    const footerJson = JSON.parse(fs.readFileSync('./i18n/en/docusaurus-theme-classic/footer.json', 'utf8'));
    const footerHash = crypto.createHash('md5').update(JSON.stringify(footerJson)).digest('hex');

    const navbarJson = JSON.parse(fs.readFileSync('./i18n/en/docusaurus-theme-classic/navbar.json', 'utf8'));
    const navbarHash = crypto.createHash('md5').update(JSON.stringify(navbarJson)).digest('hex');


    for(const language of languages){
        console.log('language', language);
        if(!translationCache[language]){
            translationCache[language] = {};
        }

        const translateJson = async (json, hash, prop, saveTo) => {
            console.log(`Translating ${prop} for ${language}`);
            const translatedJson = {};
            if(!translationCache[language][prop] || translationCache[language][prop].hash !== codeHash){
                for(const key in json){
                    const translated = await translateText(json[key].message, language);
                    console.log('translated', translated);

                    if(!translated){
                        console.error(`Translation failed for code.json key: ${key}`);
                        translatedJson[key] = json[key];
                        continue;
                    }

                    translatedJson[key] = json[key];
                    translatedJson[key].message = translated;

                }

                translationCache[language][prop] = {
                    hash,
                    timestamp: Date.now(),
                    manually_translated: false,
                };
                saveCache(translationCache);

                if(!fs.existsSync(path.dirname(saveTo))){
                    fs.mkdirSync(path.dirname(saveTo), { recursive: true });
                }
                fs.writeFileSync(saveTo, JSON.stringify(translatedJson, null, 2));

                return translatedJson;
            }
        }

        await translateJson(codeJson, codeHash, 'code', `./i18n/${language}/code.json`);
        await translateJson(footerJson, footerHash, 'footer', `./i18n/${language}/docusaurus-theme-classic/footer.json`);
        await translateJson(navbarJson, navbarHash, 'navbar', `./i18n/${language}/docusaurus-theme-classic/navbar.json`);

    }
}

const translateDocs = async () => {

    const optionalFileArgument = process.argv[2];

    const languages = docusaurusConfig.i18n.locales.filter(locale => locale !== 'en');
    // const languages = ['zh'];

    let docPaths = optionalFileArgument ? [optionalFileArgument]
        : getAllDocs('./docs').concat(getAllDocs('./evm'));


    const translationCache = JSON.parse(fs.readFileSync('./translations/translated.json', 'utf8'));
    for(const language of languages){
        if(!translationCache[language]){
            translationCache[language] = {};
        }
    }

    for(let docPath of docPaths){
        const docPrefixPath = docPath.split('/')[0];
        for(let language of languages){
            const isTranslated = translationCache[language][docPath];
            const doc = fs.readFileSync(docPath, 'utf8');
            const hash = crypto.createHash('md5').update(doc).digest("hex");

            const translateThisDoc = async () => {
                const title = (x => x ? x[0] : docPath)(doc.match(/title:\s*(.+)/));
                console.info(`\r\nTranslating ${title} to ${language} (${docPath})`);
                const translatedDocPath = `./i18n/${language}/docusaurus-plugin-content-docs${docPrefixPath === 'docs' ? '' : `-${docPrefixPath}`}/current/${docPath.replace(`${docPrefixPath}/`, '')}`;

                const translated = await translate(doc, language);


                fs.mkdirSync(path.dirname(translatedDocPath), { recursive: true });
                fs.writeFileSync(translatedDocPath, translated);

                translationCache[language][docPath] = {
                    hash,
                    timestamp: Date.now(),
                    manually_translated: false,
                };
                saveCache(translationCache);

                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if(!isTranslated || optionalFileArgument){
                await translateThisDoc();
            } else {
                if(translationCache[language][docPath].hash !== hash){
                    await translateThisDoc();
                }
            }

        }
    }

    if(!optionalFileArgument){

        // Translates the various UI elements
        await translateUI(languages, translationCache);

        // Copies over non-doc files like diagrams, images, etc.
        // copyNonDocs('./docs', languages);
        // copyNonDocs('./evm', languages);
    }


    process.exit(0);
}

translateDocs();

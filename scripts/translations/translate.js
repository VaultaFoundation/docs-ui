require('dotenv').config();
const fs = require('fs');
const path = require('path');

// translate file using AWS Translate
const { TranslateClient, CreateParallelDataCommand } = require("@aws-sdk/client-translate");

// ENV VAR REQUIREMENTS (automatically detected by AWS SDK)
// AWS_ACCESS_KEY_ID
// AWS_SECRET_ACCESS_KEY

const translate = async (text, targetLanguageCode) => {
    const translateClient = new TranslateClient({
        region: 'us-east-1',
    });

    const params = {
        SourceLanguageCode: "en",
        TargetLanguageCode: targetLanguageCode,
        Text: text,
    };

    try {
        const data = await translateClient.send(new CreateParallelDataCommand(params));
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}


const DOCS_DIR = `./docs`;

const getAllDocs = () => {
    let files = [];
    const iterateFiles = (_files, _path = "") => {
        _files.map(file => {
            if(!path.extname(file)){
                iterateFiles(fs.readdirSync(path.join(DOCS_DIR, _path, file)), _path + '/' + file);
            }
            else if(path.extname(file) === '.md'){
                files.push(path.normalize(path.join(DOCS_DIR, _path, file)).replace(/\\/g, '/'));
            }
        });
    }

    iterateFiles(fs.readdirSync(DOCS_DIR));

    return files;
}

const translateDocs = async () => {

    // const languages = JSON.parse(fs.readFileSync('./translations/languages.json', 'utf8')).map(x => x.code);
    // console.log('languages', languages);
    const languages = ['zh'];

    let docPaths = getAllDocs();

    const translationCache = JSON.parse(fs.readFileSync('./translations/translated.json', 'utf8'));
    for(const language of languages){
        if(!translationCache[language]){
            translationCache[language] = {};
        }
    }

    docPaths = docPaths.slice(0, 1);
    for(let docPath of docPaths){
        for(let language of languages){
            const isTranslated = translationCache[language][docPath];
            if(!isTranslated){
                // translate
                const translated = await translate(docPath, language);
                console.log('not translated', docPath, language)
            } else {
                // check if matches content hash
                console.log('is translated', docPath, language)
                // check if manually translated
            }
        }


        // console.log('isTranslated', !!isTranslated);
        // const textFile = fs.readFileSync(docPath, 'utf8');
        // console.log(textFile);
    }

    // console.log(docPaths);
}

translateDocs(DOCS_DIR);

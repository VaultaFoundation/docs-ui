// copies non-md files to each language folder

const fs = require('fs');
const path = require('path');

const getAllNonDocs = (dir) => {
    let files = [];
    const iterateFiles = (_files, _path = "") => {
        _files.map(file => {
            console.log('file', file, _path);
            if(!path.extname(file)){
                iterateFiles(fs.readdirSync(path.join(dir, _path, file)), _path + '/' + file);
            }
            else if(path.extname(file) !== '.md'){
                files.push(path.normalize(path.join(dir, _path, file)).replace(/\\/g, '/'));
            }
        });
    }

    iterateFiles(fs.readdirSync(dir));

    return files;
}

const copyNonDocs = (docsPath, languages) => {
    console.log('Copying non-docs to each language folder...');
    const nonDocs = getAllNonDocs(docsPath);
    console.log('nonDocs', nonDocs);

    for(let file of nonDocs){
        for(let lang of languages){
            const langFile = file.replace(docsPath, `i18n/${lang}/docusaurus-plugin-content-docs/current/`);
            const langDir = path.dirname(langFile);

            if(fs.existsSync(langFile)) continue;

            if(!fs.existsSync(langDir)){
                fs.mkdirSync(langDir, { recursive: true });
            }
            fs.copyFileSync(file, langFile);
        }
    }
}

module.exports = {
    copyNonDocs
}

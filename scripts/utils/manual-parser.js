require('isomorphic-fetch');
const {createTmpDir, removeTmpDir} = require("./create-temp-dir");
const { downloadZip, unzip } = require("./download-repo-as-zip");
const fs = require("fs-extra");
const path = require("path");

function replaceInAllFiles(basePath, regexToReplace, replaceWith) {
    const files = fs.readdirSync(basePath);

    files.forEach((file) => {
        const filePath = path.join(basePath, file);
        if (fs.statSync(filePath).isDirectory()) {
            replaceInAllFiles(filePath, regexToReplace, replaceWith);
        } else {
            let fileContents = fs.readFileSync(filePath, 'utf8');
            fileContents = fileContents.replace(regexToReplace, replaceWith);
            fs.writeFileSync(filePath, fileContents);
        }
    });
}


const parse = async (repo, branch = "main", isLatest = true) => {
    console.log(`Preparing manual: ${repo} (${branch})`);

    const repoName = repo.split('/')[1];
    const tmpDir = `./tmp/${repo.replace(/\//, '-').replace(/\\/, '-')}`;
    if(!fs.existsSync(tmpDir)) {
        fs.mkdirsSync(tmpDir);
    }

    const manualsDir = `./manuals/`;
    if(!fs.existsSync(manualsDir)) {
        fs.mkdirsSync(manualsDir);
    }

    const basePath = `${manualsDir}/${repo.split('/')[1]}/${isLatest ? 'latest' : branch}`;

    // download repo as zip
    const zipPath = `${tmpDir}.zip`;
    await downloadZip(repo, zipPath, branch);
    await unzip(zipPath, tmpDir);

    const docsDir = `${tmpDir}/${fs.readdirSync(tmpDir)[0]}/docs`;
    try { fs.mkdirSync(basePath); } catch(e) {}

    await new Promise(r => setTimeout(r, 100));

    // move docs dir to manuals/<repo>/<branch>
    fs.moveSync(path.normalize(docsDir), path.normalize(basePath), { overwrite: true });

    // some files have a <hr> tag which docusaurus doesn't like
    replaceInAllFiles(basePath, /<hr>/g, '');
    // some files use content_title instead of title
    replaceInAllFiles(basePath, /content_title:/g, 'title:');

    // if no base index.md exists, create one
    const indexMdPath = `${basePath}/index.md`;
    if(!fs.existsSync(indexMdPath)) {
        const capitalizedTitle = repo.split('/')[1].charAt(0).toUpperCase() + repo.split('/')[1].slice(1);
        const indexMdContent = `---
title: ${capitalizedTitle} (${branch})
---
`;
        fs.writeFileSync(indexMdPath, indexMdContent);
    }

    await new Promise(r => setTimeout(r, 100));
}

module.exports = parse;

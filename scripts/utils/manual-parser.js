require('isomorphic-fetch');
const {createTmpDir, removeTmpDir} = require("./create-temp-dir");
const { downloadZip, unzip } = require("./download-repo-as-zip");
const fs = require("fs-extra");
const path = require("path");

function removeFromAllFiles(basePath, regexToRemove = /<hr>/g) {
    fs.readdir(basePath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(basePath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) throw err;

                if (stats.isDirectory()) {
                    removeFromAllFiles(filePath); // recurse into subdirectory
                } else if (stats.isFile()) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) throw err;

                        const newData = data.replace(regexToRemove, '');
                        fs.writeFile(filePath, newData, 'utf8', err => {
                            if (err) throw err;
                        });
                    });
                }
            });
        });
    });
}


const parse = async (repo, branch = "main", isLatest = true) => {
    console.log(`Preparing manual: ${repo} (${branch})`);

    await removeTmpDir();
    await createTmpDir();

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

    // find all .swagger files recursively
    const docsDir = `${tmpDir}/${fs.readdirSync(tmpDir)[0]}/docs`;

    // move docs dir to manuals/<repo>/<branch>
    fs.moveSync(docsDir, basePath, { overwrite: true });

    // some files have a <hr> tag which docusaurus doesn't like
    removeFromAllFiles(basePath, /<hr>/g);

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

//     const indexMdPath = `${basePath}/index.md`;
//     const capitalizedTitle = repo.split('/')[1].charAt(0).toUpperCase() + repo.split('/')[1].slice(1);
//     const indexMdContent = `---
// title: ${capitalizedTitle} (${branch})
// ---
//
// ${swaggerFiles.map(file => {
//     const fileName = path.basename(file);
//     const fileNameWithoutExtension = fileName.replace('.swagger.yaml', '');
//     return `- [${fileNameWithoutExtension}](/apis/${repoName}/${isLatest ? 'latest' : branch}/${fileNameWithoutExtension}.api)`;
// }).join('\n')
//     }
// `;
//
//     fs.writeFileSync(indexMdPath, indexMdContent);
//
//
//     return specs;
}

module.exports = parse;

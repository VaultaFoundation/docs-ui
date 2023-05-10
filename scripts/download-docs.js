require("isomorphic-fetch");

const { createTmpDir, removeTmpDir } = require("./utils/create-temp-dir");
const { downloadZip, unzip } = require("./utils/download-repo-as-zip");

const fs = require("fs-extra");
const yauzl = require('yauzl');
const path = require('path');

const zipPath = "./tmp/docs.zip";
const unzipDir = path.join("tmp/unpacked/");


const downloadDocs = async (branch) => {
    try { fs.rmSync("docs", { recursive: true }); } catch (e) { }
    fs.mkdirSync("docs");

    console.log(`Preparing docs: eosnetworkfoundation/docs (${branch})`);

    await downloadZip("eosnetworkfoundation/docs", zipPath, branch);
    await unzip(zipPath, unzipDir);

    // find "docs" subdir
    const files = fs.readdirSync(unzipDir);
    const docsDir = files.find(f => f.startsWith("eosnetworkfoundation-docs-"));
    const docsPath = path.join(unzipDir, docsDir, "docs");

    // copy docs subdir to root docs dir
    fs.rmSync("docs", { recursive: true });
    fs.mkdirSync("docs");

    fs.readdirSync(docsPath).forEach(file => {
        fs.moveSync(path.join(docsPath, file), path.join("docs", file), { overwrite: true|false })
    });
}

module.exports = downloadDocs;

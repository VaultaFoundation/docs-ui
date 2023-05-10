const downloadApis = require('./download-apis');
const downloadDocs = require('./download-docs');
const downloadManuals = require('./download-manuals');
const fs = require("fs-extra");

// get nodejs args
const args = process.argv.slice(2);

const skipDocs = args.find(arg => arg === '--skip-docs');
const skipApis = args.find(arg => arg === '--skip-apis');
const skipManuals = args.find(arg => arg === '--skip-manuals');

const docsBranch = args.find(arg => arg.startsWith('--docs-branch='));
const docsBranchName = docsBranch ? docsBranch.split('=')[1] : 'main'; // new-docs

const blowAwayDirectory = (dir) => {
    try { fs.rmSync(dir, { recursive: true }); } catch (e) { }
    fs.mkdirSync(dir);
}

const prepareDocs = async() => {
    if (!skipDocs) {
        blowAwayDirectory("docs");
        await downloadDocs(docsBranchName);
    }

    if (!skipApis) {
        blowAwayDirectory("apis");
        await downloadApis();
    }

    if (!skipManuals) {
        blowAwayDirectory("manuals");
        await downloadManuals();
    }
}

prepareDocs();

const manualParser = require('./utils/manual-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadManuals = async () => {
    try { fs.rmSync("manuals", { recursive: true }); } catch (e) { }
    fs.mkdirSync("manuals");

    const repos = [
        {
            repo: 'antelopeio/spring',
            versions: ['v1.0.4'],
        },
        {
            repo: 'antelopeio/cdt',
            versions: ['v4.1.0'],
        },
        {
            repo: 'eosnetworkfoundation/eos-system-contracts',
            versions: ['v3.6.1'],
        }
    ]

    for (const repo of repos) {
        const repoName = repo.repo.split('/')[1];

        for (const version of repo.versions) {
            await manualParser(repo.repo, version, version === repo.versions[0]);
        }
    }

}

module.exports = downloadManuals;
// downloadManuals();

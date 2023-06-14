const manualParser = require('./utils/manual-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadManuals = async () => {
    try { fs.rmSync("manuals", { recursive: true }); } catch (e) { }
    fs.mkdirSync("manuals");

    const repos = [
        {
            repo: 'antelopeio/leap',
            versions: ['v4.0.0', 'v3.2.3'],
        },
        {
            repo: 'antelopeio/cdt',
            versions: ['v4.0.0'],
        },
        {
            repo: 'antelopeio/dune',
            versions: ['v1.1.1'],
        },
        {
            repo: 'eosnetworkfoundation/eos-system-contracts',
            versions: ['v3.1.1'],
        },
        {
            repo: 'eosnetworkfoundation/mandel-eosjs',
            versions: ['main'],
        },
        {
            repo: 'eosnetworkfoundation/mandel-swift',
            versions: ['master']
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

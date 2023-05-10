const manualParser = require('./utils/manual-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadManuals = async () => {
    try { fs.rmSync("manuals", { recursive: true }); } catch (e) { }
    fs.mkdirSync("manuals");

    const repos = [
        // Don't enable leap, lots of malformed docs
        // {
        //     repo: 'antelopeio/leap',
        //     versions: ['main'],
        // },
        {
            repo: 'antelopeio/cdt',
            versions: ['main'],
        },
        {
            repo: 'antelopeio/dune',
            versions: ['main'],
        },
        {
            repo: 'eosnetworkfoundation/eos-system-contracts',
            versions: ['main'],
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

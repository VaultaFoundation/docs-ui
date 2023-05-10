const manualParser = require('./utils/manual-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadManuals = async () => {
    await createTmpDir();

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
            const swaggerFiles = await manualParser(repo.repo, version, version === repo.versions[0]);
        }
    }


    await removeTmpDir();
}

// module.exports = downloadManuals;
downloadManuals();

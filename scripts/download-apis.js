const swaggerParser = require('./utils/swagger-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadApis = async () => {
    await createTmpDir();
    const repos = [
        {
            repo:'antelopeIO/leap',
            versions: ['v4.0.0', 'v3.2.3']
        }
    ];

    let redocusaurusSpecs = [];

    for (const repo of repos) {
        const repoName = repo.repo.split('/')[1];

        for (const version of repo.versions) {
            redocusaurusSpecs = redocusaurusSpecs.concat(await swaggerParser(repo.repo, version, repo.versions[0] === version));
        }


        const indexMdPath = `./apis/${repoName}/index.md`;
        const capitalizedTitle = repoName.charAt(0).toUpperCase() + repoName.slice(1);


        const indexMdContent = `---
title: ${capitalizedTitle}
---

Below you can find the list of APIs that are available for ${repoName}.

${repo.versions.map(version => {
            return `- [${version === repo.versions[0] ? 'latest' : version} ${version === repo.versions[0] ? `(${version})` : ''}](/apis/${repoName}/${version === repo.versions[0] ? 'latest' : version}/)`;
}).join('\n')}

`;

        fs.writeFileSync(indexMdPath, indexMdContent);
    }

    fs.writeFileSync('./redocusaurus.specs.js', `module.exports = ${JSON.stringify(redocusaurusSpecs, null, 4)};`);

    await removeTmpDir();
}

module.exports = downloadApis;

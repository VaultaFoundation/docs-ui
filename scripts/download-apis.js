const swaggerParser = require('./utils/swagger-parser');
const {createTmpDir, removeTmpDir} = require('./utils/create-temp-dir');
const path = require("path");
const fs = require("fs-extra");

const downloadApis = async () => {
    try { fs.rmSync("apis", { recursive: true }); } catch (e) { }
    fs.mkdirSync("apis");

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
            let verMajorMinor = version.match(/\d+\.\d+/);
            let branch = (verMajorMinor === null) ? 'main' : ('release/' + verMajorMinor[0]);
            redocusaurusSpecs = redocusaurusSpecs.concat(await swaggerParser(repo.repo, branch, repo.versions[0] === version));
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

}

module.exports = downloadApis;
// downloadApis();

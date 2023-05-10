const fs = require('fs-extra');

const generateMd = async () => {

    const apis = fs.readdirSync('./apis');
    let apiVersions = [];
    for (const api of apis) {
        apiVersions.push({
            api,
            versions: fs.readdirSync(`./apis/${api}`).filter(file => !file.endsWith('.md'))
        });
    }

    const manuals = fs.readdirSync('./manuals');
    let manualVersions = [];
    for (const manual of manuals) {
        manualVersions.push({
            manual,
            versions: fs.readdirSync(`./manuals/${manual}`).filter(file => !file.endsWith('.md'))
        });
    }

    const content = `---
title: APIs and Manuals
---

Below is a list of API references and manuals for various EOS software.

## APIs

${apiVersions.map(api => {
    const capitalizedTitle = api.api.charAt(0).toUpperCase() + api.api.slice(1);
    return api.versions.map(version => {
        return `- [${capitalizedTitle} (${version})](/apis/${api.api}/${version}/)`
    }).join('\n')
}).join('\n')}

## Manuals 

${manualVersions.map(manual => {
    const capitalizedTitle = manual.manual.charAt(0).toUpperCase() + manual.manual.slice(1);
    return manual.versions.map(version => {
        return `- [${capitalizedTitle} (${version})](/manuals/${manual.manual}/${version}/)`
    }).join('\n')
}).join('\n')}


`;

    // save to docs/999_apis-and-manuals.md
    fs.writeFileSync('./docs/999_apis-and-manuals.md', content);

    console.log(content);
}

generateMd();

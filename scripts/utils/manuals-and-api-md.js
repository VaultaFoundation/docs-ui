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

    const manualOrder = [
        'spring',
        'cdt',
        'eos-system-contracts'
    ]

    const manuals = fs.readdirSync('./manuals').sort((a, b) => {
        if(!manualOrder.includes(a)) return 1;
        if(!manualOrder.includes(b)) return -1;
        return manualOrder.indexOf(a) - manualOrder.indexOf(b);
    });
    let manualVersions = [];
    for (const manual of manuals) {
        manualVersions.push({
            manual,
            versions: fs.readdirSync(`./manuals/${manual}`).filter(file => !file.endsWith('.md'))
        });
    }

    const content = `---
title: APIs and Manuals
virtual: true
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

    fs.writeFileSync('./docs/999_miscellaneous/999_apis-and-manuals.md', content);
}

module.exports = generateMd;

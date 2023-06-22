// generate a sidebar using the properties in the head of each doc

const fs = require('fs');
const { findFiles } = require('./utils/find-files');
const allDocs = findFiles('./docs', '.md');

const rootLevelDocs = fs.readdirSync('./docs');

let sidebar = {};

const getHeadProperties = (file) => {
    const head = file.split(/---/g)[1];
    if(!head) {
        console.log('no head for', file);
        return false;
    }

    const properties = {};
    head.split('\n').filter(x => !!x).forEach(line => {
        const [key, value] = line.split(':');
        if(!key || !value) return;
        properties[key.trim()] = value.trim();
    });

    return properties;
}

const run = () => {
    for(const root of rootLevelDocs){
        console.log(root);

        if(root.endsWith('.md')) continue;

        const indexPath = `./docs/${root}/index.md`;
        if(!fs.existsSync(indexPath)) continue;

        const index = fs.readFileSync(indexPath, 'utf8');
        const properties = getHeadProperties(index);
        if(!properties) continue;

        if(properties.hasOwnProperty('category') && Boolean(properties.category)){
            sidebar[properties.title] = [];
            // iterate each file here and put it into the category
            const files = fs.readdirSync(`./docs/${root}`);
            for(const file of files){
                if(file === 'index.md') continue;
                const filePath = `${root}/${file}`;
                sidebar[properties.title].push(filePath.replace('.md', ''));
            }
        }

        console.log(properties);
    }
    // for(const file of allDocs){
    //     const doc = fs.readFileSync(file, 'utf8');
    //     // take the parts between the two ---
    //     const head = doc.split(/---/g)[1];
    //     if(!head) {
    //         console.log('no head for', file);
    //         continue;
    //     }
    //     // console.log(head);
    //     const properties = {};
    //     head.split('\n').filter(x => !!x).forEach(line => {
    //         const [key, value] = line.split(':');
    //         if(!key || !value) return;
    //         properties[key.trim()] = value.trim();
    //     });
    //     console.log(properties);
    //
    //     if(properties.hasOwnProperty('category')){
    //         if(!sidebar.hasOwnProperty(properties.category)){
    //             sidebar[properties.category] = [];
    //         }
    //         sidebar[properties.category].push({
    //             type:'doc',
    //             id: file.replace('./docs/', '').replace('.md', '').replace(/\\/g, '/')
    //         });
    //
    //     }
    //
    //     // console.log(file, head);
    //     // process.exit(1);
    // }
    //
    console.log(sidebar);
};

run();

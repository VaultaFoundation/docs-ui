// get all the docs in the /docs/ folder and then sort them by last modified date

require('isomorphic-fetch');
const fs = require('fs');
const {findFiles} = require('./find-files');
const exec = require('child_process').exec;
const { rimrafSync } = require('rimraf')
let lastCommitDates = [];


const tempPath = 'docs-temp';
const docsPath = `${tempPath}/docs`;

const deleteTempDirectory = () => {
    try {
        fs.rmSync(tempPath, { recursive: true, force: true });
    } catch (e) {}
}

const cloneRepoIntoTempDirectory = async (branch) => {
    deleteTempDirectory();
    await new Promise(r => setTimeout(r, 100));
    fs.mkdirSync(tempPath);


    console.log(`Cloning docs@${branch} into ${tempPath}`);
    const cloned = await new Promise((resolve, reject) => {
        exec(`git clone https://github.com/vaultafoundation/docs.git .`, { cwd:tempPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            resolve(true);
        });
    }).catch(() => null);
    if(!cloned){
        throw new Error('failed to clone repo');
    }

    console.log(`Checking out ${branch}`);
    const checkedOut = await new Promise((resolve, reject) => {
        exec(`git checkout ${branch}`, { cwd:tempPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            resolve(true);
        });
    }).catch(() => null);
    if(!checkedOut){
        throw new Error('failed to checkout branch');
    }
}


async function getLastCommitDate(filePath) {
    return new Promise((resolve, reject) => {
        filePath = filePath.replace(/\\/g, '/').replace(tempPath, '');

        exec(`git log -1 --format=%cd -- ./${filePath}`, { cwd: tempPath }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(stderr));
                return;
            }
            const commitDate = new Date(stdout.trim());
            resolve(commitDate);
        });
    });
}

const generateLatestDocs = async (branch = "main") => {
    await cloneRepoIntoTempDirectory(branch);

    console.log(`Finding docs in ${docsPath}`);
    const docs = findFiles(docsPath, '.md');
    console.log(`Found ${docs.length} docs in ${docsPath}`);

    for(const doc of docs){
        const date = await getLastCommitDate(doc).catch(() => null);
        if(!date) {
            console.error('no date', doc);
            continue;
        }

        const filePath = `docs/${doc.replace(/\\/g, '/').split('docs/')[1]}`;

        lastCommitDates.push({
            date: new Date(date).getTime(),
            doc: filePath,
        })

    }
    const sortedDocs = lastCommitDates.filter(x => {
        return x.date !== null && !isNaN(x.date)
            && !x.doc.includes('README.md')
            && !x.doc.includes('index.md')
            && !x.doc.includes('apis-and-manuals.md');
    }).sort((a, b) => {
        return b.date - a.date;
    });

    const latestDocs = sortedDocs.map(({ doc, date }) => {
        const docName = doc.split('/').pop().replace('.md', '');

        // get the title between the first two ---
        const docContent = fs.readFileSync(doc, 'utf8');
        if(!docContent.split('---').length){
            return null;
        }
        const title = docContent.split('---')[1].split('title:')[1].trim();

        return {
            title,
            last_updated: date,
            path: doc.replace('docs/', '/docs/').replace('.md', ''),
        }
    }).slice(0, 5);

    fs.writeFileSync('./src/components/RecentDocs/latest-docs.json', JSON.stringify(latestDocs, null, 4));
    console.log(`Saved ${latestDocs.length} docs to latest-docs.json`);

    await deleteTempDirectory();
}

module.exports = {
    generateLatestDocs
};

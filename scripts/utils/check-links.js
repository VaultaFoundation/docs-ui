require("isomorphic-fetch");

/***
 * This script checks all the content for broken links.
 */

const fs = require("fs-extra");
const path = require("path");

const findFiles = (directoryPath, extension) => {
    let fileList = [];

    const traverseDirectory = (currentPath) => {
        const files = fs.readdirSync(currentPath);

        files.forEach((file) => {
            const filePath = path.join(currentPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                if(filePath.indexOf(extension) > -1){
                    fileList.push(filePath);
                }
            } else if (stats.isDirectory()) {
                traverseDirectory(filePath);
            }
        });
    }

    traverseDirectory(directoryPath);
    return fileList;
}


const checkLinks = async () => {
    let links = [
        /*
        {
            url:'example',
            file: 'example.md',
        }
         */
    ];

    const pushLink = (url, file) => {
        if(url.indexOf('://') === -1) return;
        if(url.indexOf('127.0.0.1') > -1) return;
        if(url.indexOf('://localhost') > -1) return;

        links.push({
            // truncate at spaces or other non-url characters
            url: url.split(/[\s<>]/)[0],
            file,
        });
    }

    // Check the APIs
    // TODO: Swagger files don't have any links to check

    // Check the Manuals
    {
        const manualsDir = `./manuals`;
        if(!fs.existsSync(manualsDir)) {
            throw new Error(`Manuals directory not found`);
        }

        const manuals = findFiles(manualsDir, '.md');
        for (const manual of manuals) {
            let manualContent = fs.readFileSync(manual, 'utf8');
            const urls = manualContent.match(/(http[^ )\]"<>]+)/g);
            if(urls) {
                for (const url of urls) {
                    pushLink(url, manual);
                }
            }
        }
    }




    {
        // Check the docs
        const docsDir = `./docs`;
        if(!fs.existsSync(docsDir)) {
            throw new Error(`Docs directory not found`);
        }

        const docs = findFiles(docsDir, '.md');
        for (const doc of docs) {
            let docContent = fs.readFileSync(doc, 'utf8');
            const urls = docContent.match(/(http[^ )\]"<>]+)/g);
            if(urls) {
                for (const url of urls) {
                    pushLink(url, doc);
                }
            }
        }
    }

    // fs.writeFileSync('./links.json', JSON.stringify(links, null, 2));

    console.log(`Found ${links.length} links to check`);


    const testLinks = async (_links) => {
        for (const link of _links) {
            try {
                const response = await fetch(link.url, {
                    method: 'HEAD',
                });

                if(response.status !== 200) {
                    console.log(`Broken link: ${link.url} (${link.file}) [${response.status}]`);
                }
            } catch(e) {
                console.log(`Broken link: ${link.url} (${link.file}) [NO STATUS] ${e}`);
            }
        }
    }

    const chunks = links.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 10 /* chunk size */)

        // start a new chunk
        if(!resultArray[chunkIndex])
            resultArray[chunkIndex] = [];

        resultArray[chunkIndex].push(item)

        return resultArray;
    }, []);

    // test links in chunks
    await Promise.all(chunks.map(chunk => testLinks(chunk)));

}

checkLinks();

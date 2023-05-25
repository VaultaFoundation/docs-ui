require("isomorphic-fetch");
const { findFiles } = require("./find-files");

/***
 * This script checks all the content for broken links.
 */

const fs = require("fs-extra");

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


    let brokenLinks = [
        /*
        {
            url:'example',
            file: 'example.md',
            status: 404,
            error: null,
        }
         */
    ];

    const testLinks = async (_links) => {
        for (const link of _links) {
            try {
                const response = await fetch(link.url, {
                    method: 'HEAD',
                });

                if(response.status !== 200) {
                    brokenLinks.push({
                        url: link.url,
                        file: link.file,
                        status: response.status,
                        error: null,
                    });
                }
            } catch(e) {
                brokenLinks.push({
                    url: link.url,
                    file: link.file,
                    status: 'NO STATUS',
                    error: e,
                });
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

    // sort errors by code
    brokenLinks.sort((a, b) => {
        if(a.status === b.status) return 0;
        if(a.status === 'NO STATUS') return 1;
        if(b.status === 'NO STATUS') return -1;
        return a.status - b.status;
    });

    for(const link of brokenLinks) {
        console.log(`[${link.status}] ${link.url} -- ${link.file} ${link.error ? ' -- ' + link.error : ''}`);
    }

    console.log(`Found ${brokenLinks.length} broken links`);

}

checkLinks();

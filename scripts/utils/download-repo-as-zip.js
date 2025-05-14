const fs = require("fs-extra");
const yauzl = require("yauzl-promise");
const path = require("path");


const unzip = async (zipPath, unzipDir) => {
    console.log(`attempting to unzip ${zipPath} into ${unzipDir}`)
    try {
        if (!fs.existsSync(unzipDir)) {
            fs.mkdirSync(unzipDir);
        }
    } catch (err) {
        throw new Error(`Error creating root level directory ${unzipDir}: ${err.message}`);
    }

    // lazyEntries not supported, may result in out of control memory consumption
    // switch to yauzl-promise we can remove promise wrapper
    const zipFile = await yauzl.open(zipPath);

    try {
        for await (const entry of zipFile) {
            const filePath = path.join(unzipDir, entry.filename);

            if (/\/$/.test(entry.filename)) {
                // Directory file names end with '/'.
                // Note that entries for directories themselves are optional.
                // An entry's fileName implicitly requires its parent directories to exist.
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true});
                }
            } else {
                // File Entry
                const readStream = await zipFile.openReadStream(entry);
                await new Promise((resolve, reject) => {
                    const writeStream = fs.createWriteStream(filePath);
                    readStream.pipe(writeStream);
                    readStream.on('end', resolve);
                    readStream.on('error', reject);
                });
            }
        }
    } catch (err) {
        throw new Error(`Error processing entry: ${err.message}`);
    } finally {
        console.log('Done unzipping');
        await zipFile.close();
    }
}

const downloadZip = async (repo, zipPath, branch = "main") => {
    try {
        fs.mkdirSync(path.dirname(zipPath), {recursive: true});
    } catch (err) {
    }
    const res = await fetch(`http://github.com/${repo}/zipball/${encodeURIComponent(branch)}/`, {
        method: 'GET', headers: {
            'Content-Type': 'application/zip'
        }
    }).then(response => {
        return response.arrayBuffer();
    }).then(arrayBuffer => {
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(zipPath, buffer);
    }).catch(err => {
        console.error(err);
        throw err;
    });
}

module.exports = {
    downloadZip, unzip
}

const fs = require("fs-extra");
const yauzl = require("yauzl");
const path = require("path");


const unzip = async (zipPath, unzipDir) => {
    return new Promise((resolve, reject) => {
        // make unzip dir
        if(!fs.existsSync(unzipDir)) {
            fs.mkdirSync(unzipDir);
        }

        yauzl.open(zipPath, {lazyEntries: true}, function(err, zipfile) {
            if (err) {
                reject(err);
                return;
            }

            zipfile.readEntry();
            zipfile.on("entry", function(entry) {
                if (/\/$/.test(entry.fileName)) {
                    // Directory file names end with '/'.
                    // Note that entries for directories themselves are optional.
                    // An entry's fileName implicitly requires its parent directories to exist.
                    zipfile.readEntry();

                    // make dir
                    if(!fs.existsSync(path.join(unzipDir, entry.fileName))) {
                        fs.mkdirSync(path.join(unzipDir, entry.fileName));
                    }

                } else {
                    // file entry
                    zipfile.openReadStream(entry, function(err, readStream) {
                        if (err) throw err;
                        readStream.on("end", function() {
                            zipfile.readEntry();
                        });
                        readStream.pipe(
                            fs.createWriteStream(path.join(unzipDir, entry.fileName))
                        );
                    });
                }
            });

            zipfile.once("end", function() {
                zipfile.close();
                resolve();
            });
        });
    });
}

const downloadZip = async (repo, zipPath, branch = "main") => {
    try { fs.mkdirSync(path.dirname(zipPath), { recursive: true }); } catch (err) {}
    const res = await fetch(`http://github.com/${repo}/zipball/${encodeURIComponent(branch)}/`, {
        method: 'GET',
        headers: {
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
    downloadZip,
    unzip
}

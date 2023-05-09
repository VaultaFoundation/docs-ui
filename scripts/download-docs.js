require("isomorphic-fetch");
const fs = require("fs-extra");
const yauzl = require('yauzl');
const path = require('path');

const branch = "new-docs";
const docsUrl = `http://github.com/eosnetworkfoundation/docs/zipball/${branch}/`;
const zipPath = "./tmp/repo.zip";
const unzipDir = path.join("tmp/unpacked/");

const unzip = async () => {
    return new Promise((resolve, reject) => {
        // make unzip dir
        fs.mkdirSync(unzipDir);

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

const downloadZip = async () => {
    const res = await fetch(docsUrl);
    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(zipPath);
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function() {
            resolve();
        });
    });
}

const createTmpDir = async () => {
    // Remove temp dir
    if (fs.existsSync("tmp")) {
        fs.rmSync("tmp", { recursive: true });
    }

    // make tmp dir
    fs.mkdirSync("tmp");
}

const downloadDocs = async () => {
    await createTmpDir();
    await downloadZip();
    await unzip();

    // find "docs" subdir
    const files = fs.readdirSync(unzipDir);
    const docsDir = files.find(f => f.startsWith("eosnetworkfoundation-docs-"));
    const docsPath = path.join(unzipDir, docsDir, "docs");

    // copy docs subdir to root docs dir
    fs.rmSync("docs", { recursive: true });
    fs.mkdirSync("docs");

    fs.readdirSync(docsPath).forEach(file => {
        console.log(
            path.join(docsPath, file),
            path.join("docs", file)
        )
        fs.moveSync(path.join(docsPath, file), path.join("docs", file), { overwrite: true|false })
        // fs.copyFileSync(path.join(docsPath, file), path.join("docs", file));
    });
}

downloadDocs();

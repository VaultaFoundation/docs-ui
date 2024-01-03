const fs = require("fs-extra");
const createTmpDir = async () => {
    if (!fs.existsSync("tmp")) {
        fs.mkdirSync("tmp");
    }
}

const removeTmpDir = async (tries = 0) => {
    try {
        // Remove temp dir
        if (fs.existsSync("tmp")) {
            fs.rmSync("tmp", { recursive: true });
        }
    } catch (e) {
        if (tries < 3) {
            tries++;
            await removeTmpDir(tries);
        } else {
            console.error(e);
        }
    }
}

module.exports = {
    createTmpDir,
    removeTmpDir
};

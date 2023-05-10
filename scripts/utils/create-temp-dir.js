const fs = require("fs-extra");
const createTmpDir = async () => {
    if (!fs.existsSync("tmp")) {
        fs.mkdirSync("tmp");
    }
}

const removeTmpDir = async () => {
    // Remove temp dir
    if (fs.existsSync("tmp")) {
        fs.rmSync("tmp", { recursive: true });
    }
}

module.exports = {
    createTmpDir,
    removeTmpDir
};

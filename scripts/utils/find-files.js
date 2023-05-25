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

module.exports = {
    findFiles
}

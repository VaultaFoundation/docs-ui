const path = require('path');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const manualsAndApiMd = require("./utils/manuals-and-api-md");
const {generateSidebars} = require("./utils/generate-sidebar");

const docsFolderPath = process.argv.slice(2)[0];

if(!docsFolderPath){
    console.error('Please provide the path to the docs folder as an argument to this script');
    process.exit(1);
}

let absolutePath = path.resolve(docsFolderPath);
console.log('absolutePath', absolutePath);

const copyDirectory = (src, dest) => {
    if(!fs.existsSync(src)){
        console.error(`Source folder ${src} does not exist`);
        process.exit(1);
    }

    try { fs.rmSync(dest, {recursive: true}); } catch (e) {}
    fs.mkdirSync(dest, {recursive: true});
    fs.copySync(src, dest, { overwrite: true });
}

let timeout = null;
let locked = false;
const unlock = () => {
    locked = false;
}
const copyFiles = async (file = null) => {
    if(!file) {
        copyDirectory(`${absolutePath}/native`, "docs");
        copyDirectory(`${absolutePath}/images`, "static/images");
        copyDirectory(`${absolutePath}/evm`, "evm");
        await manualsAndApiMd();
        return;
    }

    if(file){
        file = file.replace(/\\/g, "/");

        if(file.includes('.git')) return;
        if(file.includes('.idea')) return;
    }
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        if(locked) return;
        locked = true;

        console.log(file);

        if(file.includes("native/")){
            fs.copySync(file, path.join("docs", path.relative(`${absolutePath}/native/`, file)), { overwrite: true });
        }
        if(file.includes("evm/")){
            fs.copySync(file, path.join("evm", path.relative(`${absolutePath}/evm/`, file)), { overwrite: true });
        }
        if(file.includes("images/")){
            fs.copySync(file, path.join("static/images", path.relative(`${absolutePath}/images/`, file)), { overwrite: true });
        }

        await generateSidebars('docs');
        await generateSidebars('evm');

        unlock();
    }, 100)
};

const unlinkFile = (file) => {
    if(!file) return;

    file = file.replace(/\\/g, "/");

    if(file.endsWith('.md')){
        const relativePath = path.relative(`${absolutePath}/native/`, file);
        const docsPath = path.join("docs", relativePath);
        const evmPath = path.join("evm", relativePath);
        if(fs.existsSync(docsPath)){
            fs.rmSync(docsPath);
        }
        if(fs.existsSync(evmPath)){
            fs.rmSync(evmPath);
        }
    }
}


copyFiles();

chokidar.watch(absolutePath)
    .on('add', copyFiles)
    .on('change', copyFiles)
    .on('unlink', unlinkFile)
    .on('error', function(error) {
        console.error('Error happened', error);
    });


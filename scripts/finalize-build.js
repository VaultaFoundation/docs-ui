const fs = require('fs-extra');
const {generateLatestDocs} = require('./utils/generate-latest-docs');

const finalize = async () => {
    await require('./add-health-checks.js')();
    await generateLatestDocs("main");
}

finalize();

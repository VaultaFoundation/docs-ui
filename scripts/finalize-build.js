const fs = require('fs-extra');
const {generateLatestDocs} = require('./utils/generate-latest-docs');

const finalizeBuild = async () => {
    await require('./add-health-checks.js')();
}

finalizeBuild();

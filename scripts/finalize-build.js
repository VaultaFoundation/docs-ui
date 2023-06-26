const fs = require('fs-extra');

const finalize = () => {
    require('./add-health-checks.js')();
    require('./generate-latest-docs.js')();
}

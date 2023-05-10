const fs = require('fs-extra');

const finalize = () => {
    require('./add-health-checks.js')();
}

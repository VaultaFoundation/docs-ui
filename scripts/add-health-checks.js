const fs = require('fs-extra');

const generateHealthChecks = async () => {
    const dir = './build/healthcheck';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(`${dir}/index.txt`, 'ok');
    fs.writeFileSync(`${dir}/index.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>OK</title>
  </head>
  <body>
    <!-- page content -->
    OK
  </body>
</html>`);
}

module.exports = generateHealthChecks;

const paths = require('./resolve');
const fs = require('fs');
const os = require('os');

const updatePkgJson = (newPkgJson) => {
  fs.writeFileSync(paths.resolveToRoot('package.json'), JSON.stringify(newPkgJson, null, 2) + os.EOL);
};

module.exports = { write: updatePkgJson };

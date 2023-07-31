const { resolveToRoot } = require('../scripts/resolve');
const { exec } = require('../scripts/exec');
const fs = require('fs');

const installDeps = () => {
  exec('npm install --save-prod react react-dom --ignore-scripts');
  exec('npm install --save-dev @types/react @types/react-dom --ignore-scripts');
};

const copyParts = () => {
  const fromPath = './react-template';
  const targetPath = resolveToRoot('./');
  if (!fs.existsSync(fromPath)) {
    console.error('Could not locate react template', fromPath);
    return;
  }
  try {
    fs.cp(fromPath, targetPath, { recursive: true }, () => console.info('React Template ejected.'));
  } catch (err) {
    console.error(`Unable to copy files from:${fromPath} to:${targetPath}`, err);
    process.exit(1);
  }
};

const addReact = () => {
  installDeps();
  copyParts();
};

module.exports = { addReact };

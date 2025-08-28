#!/usr/bin/env node --experimental-modules
import fs from 'fs';

import exec from '../scripts/exec.mjs';
import paths from '../scripts/resolve.mjs';

const installDeps = () => {
  exec('npm install --save-prod react react-dom --ignore-scripts');
  exec('npm install --save-dev @types/react @types/react-dom --ignore-scripts');
};

const copyParts = () => {
  const fromPath = paths.resolveOwn('./react-template');
  const targetPath = paths.resolveToRoot('./');
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

export default addReact;

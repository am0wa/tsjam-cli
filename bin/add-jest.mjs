#!/usr/bin/env node --experimental-modules
import fs, { readFileSync } from 'fs';

import exec from '../scripts/exec.mjs';
import paths from '../scripts/resolve.mjs';
import pkg from '../scripts/write-pkg.mjs';

const installDeps = () => {
  exec('npm install --save-dev @tsjam/jest-config-recommended --ignore-scripts');
};

const templatePath = './jest-template';

const copyParts = () => {
  const fromPath = paths.resolveOwn(templatePath);
  const targetPath = paths.resolveToRoot('./');
  if (!fs.existsSync(fromPath)) {
    console.error('Could not locate tsjam jest template', fromPath);
    return;
  }
  console.log('> vanilla flat configs ts jest...🍯');
  try {
    fs.cp(
      fromPath,
      targetPath,
      {
        recursive: true,
        filter(source, destination) {
          return !source.includes('-template.json');
        },
      },
      () => console.info('TsJam Jest Template ejected.'),
    );
  } catch (err) {
    console.error(`Unable to copy files from:${fromPath} to:${targetPath}`, err);
    process.exit(1);
  }
};

const addJest = () => {
  installDeps();
  copyParts();
  pkg.merge('./jest-template/pkg-template.json');
};

export default addJest;

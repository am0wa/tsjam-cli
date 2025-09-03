#!/usr/bin/env node --experimental-modules
import fs, { readFileSync } from 'fs';
import colors from 'yoctocolors';

import exec from '../scripts/exec.mjs';
import paths from '../scripts/resolve.mjs';
import pkg from '../scripts/write-pkg.mjs';

const installDeps = () => {
  exec('npm install --save-dev typescript @tsjam/web-config-base @tsjam/eslint-config-recommended --ignore-scripts');
  exec('npm install --save-prod rxjs tsjam --ignore-scripts');
};

const copyParts = () => {
  const fromPath = paths.resolveOwn('./tsjam-template');
  const targetPath = paths.resolveToRoot('./');
  if (!fs.existsSync(fromPath)) {
    console.error('Could not locate tsjam template', fromPath);
    return;
  }
  console.log('> vanilla configs ts lint prettier...🍯');
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
      () => console.info(colors.green('TsJam Template ejected.')),
    );
  } catch (err) {
    console.error(colors.red(`Unable to copy files from:${fromPath} to:${targetPath}`), err);
    process.exit(1);
  }
};

// Rename extracted gitignore into .gitignore
const copyGitignore = () => {
  const gitignorePath = paths.resolveToRoot('./.gitignore');
  const extractedGitignorePath = paths.resolveToRoot('./gitignore');
  if (!fs.existsSync(gitignorePath) && fs.existsSync(extractedGitignorePath)) {
    fs.renameSync(extractedGitignorePath, gitignorePath);
  }
};

const addTsjam = () => {
  installDeps();
  copyParts();
  copyGitignore();
  pkg.merge('./tsjam-template/pkg-template.json');
};

export default addTsjam;

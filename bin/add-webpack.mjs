#!/usr/bin/env node --experimental-modules
import fs, { readFileSync } from 'fs';

import paths from '../scripts/resolve.mjs';
import pkg from '../scripts/write-pkg.mjs';

/** Extracts parts into the .webpack config */
const copyParts = () => {
  const targetPath = paths.resolveToRoot('.webpack');
  console.info('Webpack config would be ejected into:', targetPath);
  const fromPath = paths.resolveOwn('./webpack');
  if (!fs.existsSync(fromPath)) {
    console.error('Could not locate webpack template', fromPath);
    return;
  }
  try {
    fs.cp(fromPath, targetPath, { recursive: true }, () =>
      console.info('Webpack Parts ejected: .webpack; wp:start/build scripts; .env file;'),
    );
  } catch (err) {
    console.error(`Unable to copy files from:${fromPath} to:${targetPath}`, err);
    process.exit(1);
  }
};

const ejectScriptsAndDeps = () => {
  const targetPkg = paths.resolveToRoot('package.json');
  const targetPkgJson = JSON.parse(readFileSync(targetPkg, 'utf8'));

  if (!fs.existsSync(targetPkg)) {
    console.error(`package.json is not exists yet run 'npm init' first`, targetPkg);
    return;
  }

  const newScripts = {
    'wp:start': 'webpack serve --node-env=development --config .webpack/config.development.ts',
    'wp:build': 'webpack build --node-env=production --config .webpack/config.production.ts',
  };
  console.log('> adding scripts:', JSON.stringify(newScripts, null, '\r\t'));

  const basePkg = paths.resolveOwn('package.json');
  const basePkgJson = JSON.parse(readFileSync(basePkg, 'utf8'));
  console.log('> adding devDependencies:', JSON.stringify(basePkgJson.devDependencies, null, '\r\t'));

  const newPkgJson = {
    ...targetPkgJson,
    scripts: { ...newScripts, ...targetPkgJson.scripts },
    devDependencies: {
      ...targetPkgJson.devDependencies,
      ...basePkgJson.devDependencies,
    },
  };

  pkg.write(newPkgJson);
};

const addDotEnv = () => {
  const dotEnvPath = paths.resolveToRoot('.env');
  if (fs.existsSync(dotEnvPath)) {
    console.log('.env already exists');
    return;
  }
  console.log('> adding .env file');
  fs.appendFile(dotEnvPath, 'SECRET_KEY="Add Ur Env Variable"', (err) => {
    if (err) throw err;
    console.log('.env created');
  });
};

const addWebpack = () => {
  copyParts();
  ejectScriptsAndDeps();
  addDotEnv();
};

export default addWebpack;

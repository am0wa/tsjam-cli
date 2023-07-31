const fs = require('fs');
const { resolveToRoot, resolveToNodeModules, resolveToPath } = require('../scripts/resolve');
const os = require('os');
const { exec } = require('../scripts/exec');

const CONFIG_TARGET = '.webpack';
const resolveToLib = resolveToPath('./../');
const CONFIG_SRC = resolveToLib('./webpack');

/**
 * Extracts parts into the webpack config.
 * @Usage
 *    "check:shared-dependencies": "$ node eject-webpack <target-package-name>"
 */

const args = process.argv.slice(2);
const target = args[0] || CONFIG_TARGET;
const targetPath = resolveToRoot(target);
console.info('Webpack config would be ejected into:', targetPath);

const copyParts = () => {
  const fromPath = './webpack';
  try {
    fs.cp(CONFIG_SRC, targetPath, { recursive: true }, () =>
      console.info('Webpack Parts ejected: .webpack; wp:start/build scripts; .env file;'),
    );
  } catch (err) {
    console.error(`Unable to copy files from:${fromPath} to:${targetPath}`, err);
    process.exit(1);
  }
};

const updatePkgJson = (newPkgJson) => {
  const os = require('os');
  fs.writeFileSync(resolveToRoot('package.json'), JSON.stringify(newPkgJson, null, 2) + os.EOL);
};

const ejectScriptsAndDeps = () => {
  const targetPkg = resolveToRoot('package.json');
  const targetPkgJson = require(targetPkg);

  const newScripts = {
    'wp:start': 'webpack serve --node-env=development --config .webpack/config.development.ts',
    'wp:build': 'webpack build --node-env=production --config .webpack/config.production.ts',
  };
  console.log('> adding scripts:', JSON.stringify(newScripts, null, '\r\t'));

  const basePkgJson = require(resolveToLib('package.json'));
  console.log('> adding devDependencies:', JSON.stringify(basePkgJson.dependencies, null, '\r\t'));

  const newPkgJson = {
    ...targetPkgJson,
    scripts: { ...newScripts, ...targetPkgJson.scripts },
    devDependencies: { ...targetPkgJson.devDependencies, ...basePkgJson.dependencies },
  };

  updatePkgJson(newPkgJson);
};

const addDotEnv = () => {
  const dotEnvPath = resolveToRoot('.env');
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

copyParts();
ejectScriptsAndDeps();
addDotEnv();

exec('npm install --save-prod react react-dom --ignore-scripts');
exec('npm install --save-dev @types/react @types/react-dom --ignore-scripts');

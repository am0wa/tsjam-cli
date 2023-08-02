const fs = require('fs');
const exec = require('../scripts/exec');
const paths = require('../scripts/resolve');
const pkg = require('../scripts/write-pkg');

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
      () => console.info('TsJam Template ejected.'),
    );
  } catch (err) {
    console.error(`Unable to copy files from:${fromPath} to:${targetPath}`, err);
    process.exit(1);
  }
};

const pkgSetConfigs = () => {
  const targetPkg = paths.resolveToRoot('package.json');
  const targetPkgJson = require(targetPkg);

  const basePkgJson = require(paths.resolveOwn('./tsjam-template/pkg-template.json'));
  console.log('> adding pkg configs:', JSON.stringify(basePkgJson, null, '\r\t'));

  const newPkgJson = {
    ...targetPkgJson,
    ...basePkgJson,
    scripts: { ...targetPkgJson.scripts, ...basePkgJson.scripts },
  };

  pkg.write(newPkgJson);
};

const addTsjam = () => {
  installDeps();
  copyParts();
  pkgSetConfigs();
};

module.exports = addTsjam;

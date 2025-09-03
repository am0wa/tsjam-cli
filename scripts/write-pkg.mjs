import fs, { readFileSync } from 'fs';
import os from 'os';

import paths from './resolve.mjs';

const updatePkgJson = (newPkgJson) => {
  fs.writeFileSync(paths.resolveToRoot('package.json'), JSON.stringify(newPkgJson, null, 2) + os.EOL);
};

const pkgMergeConfigs = (fromPkg) => {
  const targetPkg = paths.resolveToRoot('package.json');
  const targetPkgJson = JSON.parse(readFileSync(targetPkg, 'utf8'));

  const basePkg = paths.resolveOwn(fromPkg);
  const basePkgJson = JSON.parse(readFileSync(basePkg, 'utf8'));
  console.log('> adding pkg configs:', JSON.stringify(basePkgJson, null, '\r\t'));

  const newPkgJson = {
    ...targetPkgJson,
    ...basePkgJson,
    scripts: { ...targetPkgJson.scripts, ...basePkgJson.scripts },
  };

  updatePkgJson(newPkgJson);
};

export default { write: updatePkgJson, merge: pkgMergeConfigs };

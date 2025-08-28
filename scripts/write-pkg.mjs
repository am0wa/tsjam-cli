import fs from 'fs';
import os from 'os';

import paths from './resolve.mjs';

const updatePkgJson = (newPkgJson) => {
  fs.writeFileSync(paths.resolveToRoot('package.json'), JSON.stringify(newPkgJson, null, 2) + os.EOL);
};

export default { write: updatePkgJson };

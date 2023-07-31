const path = require('path');

const resolveToPath =
  (toPath) =>
  (...args) =>
    path.join(toPath, ...args);
const resolveToRoot = resolveToPath(process.cwd());
const resolveToNodeModules = resolveToPath(resolveToRoot('./node_modules'));

module.exports = {
  resolveToPath,
  resolveToRoot,
  resolveToNodeModules,
};

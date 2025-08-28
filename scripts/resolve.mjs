import { dirname, join, resolve } from 'path';

/** @see https://nodejs.org/api/esm.html#importmetaurl */
const __dirname = dirname(import.meta.filename);

const resolveToPath =
  (toPath) =>
  (...args) =>
    join(toPath, ...args);
const resolveToRoot = resolveToPath(process.cwd());
const resolveToNodeModules = resolveToPath(resolveToRoot('./node_modules'));
const resolveOwn = (relativePath) => resolve(__dirname, '../', relativePath);

export default {
  resolveToPath,
  resolveToRoot,
  resolveToNodeModules,
  resolveOwn,
};

import { resolve, dirname } from 'path';

/** @see https://nodejs.org/api/esm.html#importmetaurl */
const __dirname = dirname(import.meta.filename);

const appRoot = resolve(process.cwd());
const resolvePath = (...relativePaths) => resolve(appRoot, ...relativePaths);

/* Uncomment the following lines if you need to use the app version from package.json */
// import pkg from "../package.json" with { type: 'json' }
// export const APP_VERSION = pkg.version;

console.log('APP_ROOT', appRoot);

const paths = {
  APP_ROOT: appRoot,
  APP_PUBLIC: resolvePath('public'),
  APP_HTML: resolvePath('public/index.html'),
  APP_MANIFEST: resolvePath('public/manifest.json'),
  APP_FAVICON: resolvePath('public/favicon.ico'),
  SRC: resolvePath('src'),
  DIST: resolvePath('dist'),
  NODE_MODULES: resolvePath('node_modules'),
  DOT_ENV: resolvePath('.env'),
  TS_CONFIG: resolvePath('tsconfig.json'),
  PACKAGE_JSON: resolvePath('package.json'),
  resolvePublic: (relativePath) => resolvePath('public', relativePath),
  resolveSrc: (relativePath) => resolvePath('src', relativePath),
  resolveDist: (relativePath) => resolvePath('dist', relativePath),
  resolveNodeModule: (relativePath) => resolvePath('node_modules', relativePath),
  resolveAppPath: resolvePath,
};

// config after eject: we're in ./webpack
export default paths;

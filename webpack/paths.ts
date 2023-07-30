const path = require('path');

const appRoot: string = path.resolve(process.cwd());
const resolvePath = (...relativePaths: string[]): string => path.resolve(appRoot, ...relativePaths);

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
  resolvePublic: (relativePath: string) => resolvePath('public', relativePath),
  resolveSrc: (relativePath: string) => resolvePath('src', relativePath),
  resolveDist: (relativePath: string) => resolvePath('dist', relativePath),
  resolveNodeModule: (relativePath: string) => resolvePath('node_modules', relativePath),
  resolveAppPath: resolvePath,
};

// module.exports = paths; // commonjs uncomment to run via ts-node

// config after eject: we're in ./webpack
export default paths;

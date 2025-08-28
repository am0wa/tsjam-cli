import { readFileSync } from 'fs';
import { merge } from 'webpack-merge';

import { cssLoader } from './parts/css-loader.mjs';
import { definePlugin } from './parts/define-plugin.mjs';
import { favicon } from './parts/favicon.mjs';
import { htmlPlugin } from './parts/html-plugin.mjs';
import { isDev } from './parts/is-dev.mjs';
import { loadAssets } from './parts/load-assets.mjs';
import { progress } from './parts/progress.mjs';
import { swcLoader } from './parts/swc-loader.mjs';
import { tsChecker } from './parts/ts-checker.mjs';
import paths from './paths.mjs';

const dotenv = require('dotenv').config({
  path: paths.resolveAppPath('./.env'),
});
console.log('dotenv:', dotenv.parsed);

console.log('favicon:', paths.APP_FAVICON);

// read package.json to get app version
const pkg = JSON.parse(readFileSync(paths.PACKAGE_JSON, 'utf8'));
const APP_VERSION = pkg.version;

// read manifest.json to get app name
const manifest = JSON.parse(readFileSync(paths.APP_MANIFEST, 'utf8'));
const APP_MANIFEST = manifest;

export const extensions = ['.tsx', '.ts', '.js', '.jsx'];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

/**
 * @returns {import('webpack').Configuration}
 */
export const baseConfig = merge(
  {
    entry: [paths.resolveSrc('index.tsx')],
    context: paths.APP_ROOT,
    output: {
      path: paths.DIST,
      publicPath: '/',
    },
    resolve: {
      alias: {
        '@app': paths.SRC,
      },
      modules: [paths.NODE_MODULES, paths.SRC],
      extensions,
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.jsx': ['.jsx', '.tsx'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
    },
    stats: {
      modules: false,
      children: false,
    },
  },
  swcLoader(),
  tsChecker(),
  loadAssets({ include: [paths.SRC] }),
  cssLoader(),
  definePlugin({
    __DEVELOPMENT__: isDev(),
    APP_NAME: APP_MANIFEST.name,
    APP_VERSION: JSON.stringify(APP_VERSION),
    'process.env': JSON.stringify(dotenv.parsed), // @usage: console.log(`ENV Variable: ${process.env.SECRET_KEY}`);
  }),
  htmlPlugin({
    template: paths.APP_HTML,
    title: APP_MANIFEST.name,
    favicon: paths.APP_FAVICON,
    version: APP_VERSION,
  }),
  progress(),
  favicon({
    logo: paths.APP_FAVICON,
    appName: APP_MANIFEST.name,
  }),
);

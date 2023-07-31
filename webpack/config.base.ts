import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import { loadEslint } from './parts/load-eslint';
import { loadAssets } from './parts/load-assets';
import { swcLoader } from './parts/swc-loader';
import { tsChecker } from './parts/ts-checker';
import { definePlugin } from './parts/define-plugin';
import { htmlPlugin } from './parts/html-plugin';
import { copy } from './parts/copy';
import { progress } from './parts/progress';
import { cssLoader } from './parts/css-loader';
import { isDev } from './parts/is-dev';

import paths from './paths';

const dotenv = require('dotenv').config({ path: paths.resolveAppPath('./.env') });
console.log('dotenv:', dotenv.parsed);

console.log('favicon:', paths.APP_FAVICON);

const APP_VERSION = require(paths.PACKAGE_JSON).version;
const APP_MANIFEST = require(paths.APP_MANIFEST);

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const extensions = ['.tsx', '.ts', '.js', '.jsx'];

export const baseConfig: Configuration = merge(
  {
    entry: [paths.resolveSrc('index.tsx')],
    context: paths.APP_ROOT,
    output: {
      path: paths.DIST,
      publicPath: '/',
    },
    resolve: {
      alias: {
        /* '@designSystem': paths.DESIGN_SYSTEM */
      },
      modules: [paths.NODE_MODULES, paths.SRC],
      extensions,
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
  loadEslint({ extensions, srcPath: paths.SRC }),
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
  copy({
    patterns: [
      {
        from: paths.resolveSrc('assets'),
        to: paths.resolveDist('assets'),
        force: true,
      },
    ],
  }),
);

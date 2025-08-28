import { merge } from 'webpack-merge';

import { baseConfig } from './config.base.mjs';
import { cleanupDist } from './parts/cleanup-dist.mjs';
import { optimization } from './parts/optimization.mjs';

const DIST_FILENAME_PROD_JS = 'js/[name].[contenthash:8].js';
const DIST_FILENAME_PROD_JS_MAP = 'js/[name].[contenthash:8].js.map';

/**
 * @param mode {object}
 * @returns {import('webpack').Configuration}
 */
const production = (mode) => {
  const fast = 'fast' in mode && !!mode.fast;
  console.log(`Production mode: ${fast ? '(fast)🚀' : '(final)🧑‍🚀'}`);

  const fullConfig = merge([
    { devtool: 'nosources-source-map' }, // Ref exists - source code not included
    cleanupDist(),
    // note: no extra lint – we assume that all code was already linted during DEV & PR builds
    optimization(),
  ]);

  /**
   * @type {import('webpack').Configuration}
   */
  const fastConfig = merge([
    {
      devtool: false,
      performance: { hints: false },
      optimization: {
        minimize: false,
        checkWasmTypes: false,
        emitOnErrors: true,
      },
    },
  ]);

  return merge(
    baseConfig,
    {
      mode: 'production',
      bail: true, // Fail Fast
      devtool: false, // No source-maps
      output: {
        publicPath: 'auto',
        filename: DIST_FILENAME_PROD_JS,
        sourceMapFilename: DIST_FILENAME_PROD_JS_MAP,
      },
    },
    fast ? fastConfig : fullConfig,
    // Uncommented ONLY when necessary – tt takes a huge amount of build time.
    // analyzeBundle(),
  );
};

export default production;

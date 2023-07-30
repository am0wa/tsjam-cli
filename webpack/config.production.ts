import { merge } from 'webpack-merge';

import { baseConfig } from './config.base';
import { cleanupDist } from './parts/cleanup-dist';
import { optimization } from './parts/optimization';

const DIST_FILENAME_PROD_JS = 'js/[name].[contenthash:8].js';
const DIST_FILENAME_PROD_JS_MAP = 'js/[name].[contenthash:8].js.map';

const production = merge(
  baseConfig,
  {
    mode: 'production',
    bail: true,
    devtool: 'nosources-source-map',
    output: {
      publicPath: 'auto',
      filename: DIST_FILENAME_PROD_JS,
      sourceMapFilename: DIST_FILENAME_PROD_JS_MAP,
    },
  },
  cleanupDist(),
  optimization(),
);

export default production;

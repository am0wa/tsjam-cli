import { merge } from 'webpack-merge';

import { baseConfig } from './config.base';
import { loadDevServer } from './parts/load-dev-server';

process.env.NODE_ENV = 'development';
const development = merge(
  baseConfig,
  {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      emitOnErrors: true,
    },
    snapshot: {
      managedPaths: [],
    },
  },
  loadDevServer(),
);

export default development;

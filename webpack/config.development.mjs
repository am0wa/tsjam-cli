import { merge } from 'webpack-merge';

import { baseConfig } from './config.base.mjs';
import { lazyCompilation } from './parts/lazy-compilation.mjs';
import { loadDevServer } from './parts/load-dev-server.mjs';

/**
 * @param mode {{lazy:? boolean | string}}
 * @returns {import('webpack').Configuration}
 */
const development = (mode) => {
  const lazy = !!mode?.lazy;
  console.log(`Development mode: ${lazy ? '(lazy) 🐌' : '🦄️'}`, mode);

  return merge(
    baseConfig,
    {
      mode: 'development',
      devtool: 'cheap-source-map',
      optimization: {
        emitOnErrors: true,
      },
      snapshot: {
        managedPaths: [],
      },
    },
    lazyCompilation(lazy),
    loadDevServer({
      /* note: U can serve static assets in dev without copying */
    }),
  );
};

export default development;

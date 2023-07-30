import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

/**
 * Webpack v5 comes with the latest terser-webpack-plugin out of the box.
 * If you are using Webpack v5 or above and wish to customize the options,
 * you will still need to install terser-webpack-plugin.
 * https://www.npmjs.com/package/terser-webpack-plugin
 */
export const optimization = (): Configuration => ({
  performance: {
    hints: false,
  },
  optimization: {
    emitOnErrors: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    chunkIds: 'named',
    moduleIds: 'named',
    runtimeChunk: {
      name: 'runtime',
    },
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),
    ],
    splitChunks: {
      // minSize: defaults to 20k in production
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: false, // disable webpack's defaults
        default: false, // disable webpack's defaults
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 20, // if module falls into many chunk groups, then higher priority will be used to make a final decision
          chunks: 'initial', // bundle only sync chunks
          enforce: true, // create chunk even if its size is less than 30kb
        },
      },
    },
  },
});

import TerserPlugin from 'terser-webpack-plugin';

/**
 * @returns {import('webpack').Configuration}
 */
export const optimization = () => ({
  performance: {
    hints: false,
  },
  optimization: {
    emitOnErrors: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    chunkIds: 'named',
    moduleIds: 'named',
    minimize: true,
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

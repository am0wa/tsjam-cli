import CopyWebpackPlugin from 'copy-webpack-plugin';

/**
 * @param options {import('copy-webpack-plugin').PluginOptions}
 * @returns {import('webpack').Configuration}
 */
export const copy = (options) => ({
  plugins: [new CopyWebpackPlugin(options)],
});

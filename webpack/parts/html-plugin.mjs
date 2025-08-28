import HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * @param options {HtmlWebpackPlugin.Options}
 * @returns {{plugins: [HtmlWebpackPlugin]}}
 */
export const htmlPlugin = (options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
});

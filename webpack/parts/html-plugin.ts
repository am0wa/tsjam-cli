import HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 * https://github.com/jantimon/html-webpack-plugin
 */
export const htmlPlugin = (options: HtmlWebpackPlugin.Options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
});

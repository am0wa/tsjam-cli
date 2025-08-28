import { EnvironmentPlugin } from 'webpack';

/**
 * https://webpack.js.org/plugins/environment-plugin/
 *
 *    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']);
 *    // is equivalent to
 *
 *    new webpack.DefinePlugin({
 *      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
 *      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
 *    });
 *
 * @param keys {any[]}
 * @returns {import('webpack').Configuration}
 */
export const environmentPlugin = (keys) => ({
  plugins: [new EnvironmentPlugin(keys)],
});

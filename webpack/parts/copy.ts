import CopyWebpackPlugin, { PluginOptions } from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

export const copy = (options: PluginOptions): Configuration => ({
  plugins: [new CopyWebpackPlugin(options)],
});

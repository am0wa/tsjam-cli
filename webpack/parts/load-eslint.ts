import { Configuration } from 'webpack';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

import { isDev } from './is-dev';

type LoadEslintPluginOptions = {
  srcPath: string;
  extensions: string[];
};

export const loadEslint = (options: LoadEslintPluginOptions): Configuration => ({
  plugins: [
    new ESLintWebpackPlugin({
      context: options.srcPath,
      extensions: options.extensions,
      threads: isDev(),
      lintDirtyModulesOnly: isDev(),
    }),
  ],
});

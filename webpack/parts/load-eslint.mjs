import ESLintWebpackPlugin from 'eslint-webpack-plugin';

import { isDev } from './is-dev.mjs';

/**
 * @param options {{extensions: string[], context: string}}
 * @returns {import('webpack').Configuration}
 */
export const loadEslint = (options) => ({
  plugins: [
    new ESLintWebpackPlugin({
      configType: 'flat',
      context: options.context,
      extensions: options.extensions,
      threads: isDev(),
      lintDirtyModulesOnly: isDev(),
      cache: isDev(),
    }),
  ],
});

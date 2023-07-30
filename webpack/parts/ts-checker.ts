import { Configuration } from 'webpack';

/**
 * Speeds up TypeScript type checking (by moving it to a separate process) 🏎
 * https://www.npmjs.com/package/fork-ts-checker-webpack-plugin
 */
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { isDev } from './is-dev';

export const tsChecker = (): Configuration => ({
  plugins: [new ForkTsCheckerWebpackPlugin({ async: isDev() })],
});

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { isDev } from './is-dev.mjs';

/**
 * @returns {import('webpack').Configuration}
 */
export const tsChecker = () => ({
  plugins: [new ForkTsCheckerWebpackPlugin({ async: isDev() })],
});

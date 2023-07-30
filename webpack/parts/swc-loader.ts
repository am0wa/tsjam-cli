import { Configuration } from 'webpack';

import { isDev } from './is-dev';

/**
 * > SWC is 20x faster than Babel on a single thread and 70x faster on four cores. 🏎
 * Allows you to use SWC with webpack: https://swc.rs/
 */
export const swcLoader = (): Configuration => ({
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: true,
                decoratorsBeforeExport: true,
              },
              transform: {
                useDefineForClassFields: true,
                legacyDecorator: true,
                decoratorMetadata: true,
                react: {
                  runtime: 'automatic',
                  development: isDev(),
                  refresh: isDev(),
                },
              },
            },
          },
        },
      },
    ],
  },
});

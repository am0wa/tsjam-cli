import { isDev } from './is-dev.mjs';

/**
 * @returns {import('webpack').Configuration}
 */
export const swcLoader = () => ({
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

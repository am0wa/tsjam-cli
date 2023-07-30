import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import pxToRem from 'postcss-pxtorem'; //polyfill types

import { isDev } from './is-dev';

export const DIST_FILENAME_DEV_CSS = 'css/[name].css';

export const DIST_FILENAME_PROD_CSS = 'css/[name].[contenthash:8].min.css';

export const cssLoader = (): Configuration => {
  const configuration: Configuration = {
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';"
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                sourceMap: !isDev(),
                modules: {
                  localIdentName: '[local]-[hash:base64:6]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isDev(),
                postcssOptions: {
                  plugins: [
                    pxToRem({
                      propList: ['*'],
                    }),
                    !isDev() && cssnano({ preset: ['default', { convertValues: false }] }),
                    autoprefixer({ flexbox: 'no-2009' }),
                  ].filter(Boolean),
                },
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: !isDev(),
              },
            },
            {
              loader: 'sass-loader',
              // source-maps required for loaders preceding resolve-url-loader (regardless of devtool).
              // https://www.npmjs.com/package/resolve-url-loader#configure-webpack
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };

  if (!isDev()) {
    return merge(configuration, {
      plugins: [new MiniCssExtractPlugin({ filename: DIST_FILENAME_PROD_CSS })],
    });
  }

  return configuration;
};

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import pxToRem from 'postcss-pxtorem';
import { merge } from 'webpack-merge';

import { isDev } from './is-dev.mjs';

export const DIST_FILENAME_DEV_CSS = 'css/[name].css';
export const DIST_FILENAME_PROD_CSS = 'css/[name].[contenthash:8].min.css';

/**
 * @returns {import('webpack').Configuration}
 */
export const cssLoader = () => {
  const development = isDev();
  const production = !development;
  const sourceMap = production;
  const styleLoader = development ? 'style-loader' : MiniCssExtractPlugin.loader;
  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap,
      postcssOptions: {
        plugins: [
          pxToRem({ propList: ['*'] }),
          production && cssnano({ preset: ['default', { convertValues: false }] }),
          autoprefixer({ flexbox: 'no-2009' }),
        ].filter(Boolean),
      },
    },
  };

  /**
   * @type {import('webpack').Configuration}
   */
  const configuration = {
    module: {
      rules: [
        {
          test: /\.(min\.css|css)$/,
          include: /[\\/]node_modules[\\/]swiper/,
          use: [styleLoader, 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: styleLoader },
            {
              loader: 'css-loader',
              options: {
                sourceMap,
                importLoaders: 3,
                modules: {
                  localIdentName: '[local]-[hash:base64:6]',
                },
              },
            },
            postCssLoader,
            {
              loader: 'resolve-url-loader',
              options: { sourceMap },
            },
            {
              loader: 'sass-loader',
              // source-maps required for loaders preceding resolve-url-loader (regardless of devtool).
              // https://www.npmjs.com/package/resolve-url-loader#configure-webpack
              options: {
                sourceMap: true,
                sassOptions: { quietDeps: true },
              },
            },
          ],
        },
      ],
    },
  };

  if (production) {
    return merge(configuration, {
      plugins: [
        new MiniCssExtractPlugin({
          filename: DIST_FILENAME_PROD_CSS,
          ignoreOrder: true,
        }),
      ],
    });
  }

  return configuration;
};

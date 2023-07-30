import { Configuration } from 'webpack';

import { isDev } from './is-dev';

export type LoadAssetsOptions = {
  include: string[];
};

const DIST_FILENAME_DEV_FONT = 'fonts/[name][ext]';
const DIST_FILENAME_DEV_IMG = 'img/[name][ext]';

const DIST_FILENAME_PROD_FONT = 'fonts/[name].[contenthash:8][ext]';
const DIST_FILENAME_PROD_IMG = 'img/[name].[contenthash:8][ext]';

export const loadAssets = ({ include }: LoadAssetsOptions): Configuration => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        include: include,
        type: 'asset/resource',
        generator: {
          filename: isDev() ? DIST_FILENAME_DEV_FONT : DIST_FILENAME_PROD_FONT,
        },
      },
      {
        test: /\.(webp|gif|svg|jpeg|jpg|png|mp4|webm)$/,
        include: include,
        type: 'asset',
        generator: {
          filename: isDev() ? DIST_FILENAME_DEV_IMG : DIST_FILENAME_PROD_IMG,
        },
      },
    ],
  },
});

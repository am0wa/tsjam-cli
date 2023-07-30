import { Configuration } from 'webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

type FaviconsOptions = {
  logo: string;
  appName: string;
};

/**
 * Leverages on favicons to automatically generate your favicons for you.
 * https://www.npmjs.com/package/favicons-webpack-plugin
 */
export const favicon = ({ logo, appName }: FaviconsOptions): Configuration => ({
  plugins: [
    new FaviconsWebpackPlugin({
      logo,
      mode: 'webapp',
      devMode: 'webapp',
      cache: true,
      inject: true,
      favicons: {
        appName,
        background: '#0a0a1a',
        theme_color: '#0a0a1a',
        icons: {
          yandex: false,
          appleStartup: false,
          windows: false,
          android: false,
          favicons: true,
          appleIcon: true,
        },
      },
    }),
  ],
});

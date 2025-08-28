import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

/**
 * @param options {{ logo: string, appName: string }}
 * @returns {import('webpack').Configuration}
 */
export const favicon = ({ logo, appName }) => ({
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

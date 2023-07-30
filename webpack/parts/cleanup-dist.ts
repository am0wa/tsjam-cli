import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Configuration } from 'webpack';

export const cleanupDist = (): Configuration => ({
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!build.json'],
    }),
  ],
});

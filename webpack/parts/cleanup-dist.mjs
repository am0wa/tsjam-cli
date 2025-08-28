import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const cleanupDist = () => ({
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!build.json'],
    }),
  ],
});

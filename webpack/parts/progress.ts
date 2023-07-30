import { Configuration, ProgressPlugin } from 'webpack';

/** simple Webpack plugin that display nice progress when build */
export const progress = (): Configuration => ({
  plugins: [new ProgressPlugin()],
});

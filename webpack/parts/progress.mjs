import wp from 'webpack';

/**
 * @returns {import('webpack').Configuration}
 */
export const progress = () => ({
  plugins: [new wp.ProgressPlugin()],
});

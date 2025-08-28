import wp from 'webpack';

/**
 * @param definitions {Record<string, string | boolean>}
 * @returns {import('webpack').Configuration}
 */
export const definePlugin = (definitions) => ({
  plugins: [new wp.DefinePlugin(definitions)],
});

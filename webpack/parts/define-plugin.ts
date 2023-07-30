import { Configuration, DefinePlugin } from 'webpack';

export const definePlugin = (definitions: Record<string, string | boolean>): Configuration => ({
  plugins: [new DefinePlugin(definitions)],
});

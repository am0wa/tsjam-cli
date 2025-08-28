import baseConfig from '@tsjam/web-config-base/prettier.config.mjs';

console.info('Formatting..🕵️');

const config = {
  ...baseConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderGroupNamespaceSpecifiers: false,
  importOrderCaseInsensitive: true,
};

export default config;

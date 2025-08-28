import jamEslint from '@tsjam/eslint-config-recommended';

console.info('Linting..🕵️', jamEslint.configs.recommendedTS);

/**
 * @see https://typescript-eslint.io/users/configs/#recommended
 */
export default [
  {
    ignores: ['node_modules', 'lib', 'dist', '**/*.config.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // inclues 'typescript-eslint/base'
  // inclues 'typescript-eslint/eslint-recommended'
  // inclues 'typescript-eslint/recommended-type-checked'
  // ...tsEslint.configs.recommendedTypeChecked, // + jam TS rules
  ...jamEslint.configs.recommendedTS,
  {
    rules: {
      'no-param-reassign': 'error',
      'no-console': 'warn',
      // your custom rule overrides
    },
  },
];

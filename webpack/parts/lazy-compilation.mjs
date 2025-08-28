/**
 * Enable lazy compilation for dynamic imports
 *
 * @param lazy {boolean | string}
 * @param required {[string]}
 * @returns {import('webpack').Configuration}
 */
export const lazyCompilation = (lazy, required = ['common']) => {
  const target = typeof lazy === 'string' ? [lazy] : ['lobby'];
  const notLazy = [...required, ...target];
  return lazy
    ? {
        experiments: {
          cacheUnaffected: true,
          lazyCompilation: {
            imports: true, // lazy compilation for dynamic imports
            entries: false, // no lazy compilation for entries
            test: (module) => {
              const moduleName = module.nameForCondition();
              // compute modules lazily except required ones
              const lazy = !notLazy.some((noLazyFolder) => moduleName?.includes(noLazyFolder));
              !lazy && console.log(`${lazy ? '' : 'Not'} Lazy module ${moduleName}`);
              return lazy;
            },
          },
        },
      }
    : {};
};

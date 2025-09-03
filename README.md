- 0 installed dependencies without your need
- it's like install with follow-up configs, add as you go
- ESM Flat Configs, React11, Jest30, Webpack5, TypeScript5, Eslint, Prettier
- SWC is 20x faster than Babel on a single thread and 70x faster on four cores
- ForkTsChecker – Speeds up TypeScript type checking (by moving it to a separate process)
- Obfuscate css classnames in production
- chunkhash/contenthash for assets in production
- Separate loaders for images and fonts

**Usage:** `npm i --save-dev tsjam-cli` or `npx tsjam-cli`

## Getting started

```
npm init
npx tsjam-cli --add-tsjam
npx tsjam-cli --add-jest
git init
npx tsjam-cli --add-react
npx tsjam-cli --add-webpack
git add .
git commit -m "Initial commit"
```

### Tsjam parts

**Usage:** `tsjam-cli --add-tsjam`

**Note:** the following changes would be made:

- install typescript; init tsconfig
- setup eslint & prettier tsjam recommended configs
- setup scripts and pre-commit lint-staged hook
- install tsjam core ts toolkit

### React parts

**Usage:** `tsjam-cli --add-react`

**Note:** the following changes would be made:

- install react 19 & react-dom with types
- create app sample into public and src folders accordingly

### Jest parts

**Usage:** `tsjam-cli --add-jest`

**Note:** the following changes would be made:

- install jest & jest-recommended configs
- setup jest30 ESM configs
- create 'tests' folder with sample.test.ts file
- setup tsconfig for jest

https://www.npmjs.com/package/tsjam

### Webpack parts

**Usage:** `tsjam-cli --add-webpack`

**Note:** the following changes would be made:

- add .webpack – all preconfigured plugins with webpack config
- add wp:start/build scripts into ur package.json
- add webpack related devDependencies into ur package.json
- add .env file for local environment variables usage

[webpack-cli]: https://www.npmjs.com/package/webpack-cli
[survive-js-webpack]: https://survivejs.com/webpack/foreword/
[survive-js-webpack-composing-configuration]: https://survivejs.com/webpack/developing/composing-configuration/
[webpack-nano]: https://www.npmjs.com/package/webpack-nano
[webpack-blocks]: https://www.npmjs.com/package/webpack-blocks
[webpack-the-good-parts]: https://presentations.survivejs.com/webpack-the-good-parts/#/22
[nwb]: https://www.npmjs.com/package/nwb

> Webpack does not set global `NODE_ENV` based on mode by default.
> If you have any external tooling, such as Babel, relying on it, make sure to set it explicitly.
> https://github.com/webpack/webpack-cli/issues/2362

- no worries, we've set it for u explicitly ^\_^

- SWC is 20x faster than Babel on a single thread and 70x faster on four cores
- ForkTsChecker – Speeds up TypeScript type checking (by moving it to a separate process)
- Obfuscate css classnames in production
- chunkhash/contenthash for assets in production
- Separate loaders for images and fonts

Usage: `npm -i @tsjam/webpack-parts`

Note: after install it would auto-eject all its parts into:

- .webpack – all preconfigured plugins with webpack config
- add wp:start/build scripts into ur package.json
- add devDependencies into ur package.json
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
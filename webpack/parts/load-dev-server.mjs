import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import openBrowser from 'react-dev-utils/openBrowser.js';

const PORT = 9000;
/** @type {import('webpack-dev-server').Configuration} */
const devServer = {
  hot: true,
  port: PORT,
  open: false,
  /* Provides the ability to execute a custom function when webpack-dev-server starts listening for connections on a port */
  onListening: (devServer) => {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }
    openBrowser(`http://localhost:${PORT}/`);
  },
};

/**
 * type StaticAssets = { directory: string; publicPath: string };
 * @param options {{ static?: [{ directory: string; publicPath: string }] }}
 * @returns {import('webpack').Configuration}
 */
export const loadDevServer = (options) => {
  return {
    plugins: [new ReactRefreshWebpackPlugin()],
    devServer: { ...devServer, static: options?.static },
  };
};

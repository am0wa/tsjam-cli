import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const devServer: DevServerConfiguration = {
  hot: true,
  port: 3300,
  open: true,
};

export const loadDevServer = (): Configuration => ({
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer,
});

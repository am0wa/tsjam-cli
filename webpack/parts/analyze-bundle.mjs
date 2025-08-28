import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/**
 * @returns {{ plugins: BundleAnalyzerPlugin[] }}
 */
export const analyzeBundle = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: 'bundle-analyzer-report.html',
    }),
  ],
});

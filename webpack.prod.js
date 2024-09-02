const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true, // Cleans the output directory before emit.
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Minifies JavaScript
      new CssMinimizerPlugin(), // Minifies CSS
    ],
  },
  plugins: [

        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            swDest: 'service-worker.js', 
        }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
});

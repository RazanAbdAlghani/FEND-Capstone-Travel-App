const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), 
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader'] 
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
        type: 'asset/resource', 
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html', 
      filename: 'index.html', 
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', 
    }),
  ]
};

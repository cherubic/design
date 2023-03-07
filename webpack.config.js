const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: ['./index.js', './package/header/header.sass']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
  }),
  ],
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
};

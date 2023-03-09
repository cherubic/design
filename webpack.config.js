const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ["./index.js", "./package/strawberry.scss"],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/[name].js",
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
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        include: [
          path.resolve(__dirname, 'package'),
          path.resolve(__dirname, 'package/button'),
          path.resolve(__dirname, 'package/heading')
        ],
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 
        {
          loader: 'sass-loader',
        }],
        resolve: {
          extensions: ['.scss', '.sass', '.css']
        }
      },
    ]
  }
};

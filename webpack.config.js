const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ["./index.js"],
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
          path.resolve(__dirname, 'package/styles'),
          path.resolve(__dirname, 'package/styles/button'),
          path.resolve(__dirname, 'package/styles/heading'),
          path.resolve(__dirname, 'package/fonts/MiSans')
        ],
        use: [ MiniCssExtractPlugin.loader, 'css-loader',
        {
          loader: 'sass-loader',
        }],
        resolve: {
          extensions: ['.scss', '.sass', '.css']
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: [
          path.resolve(__dirname, 'package/fonts/HarmonyOS_Sans'),
          path.resolve(__dirname, 'package/fonts/MiSans'),
          path.resolve(__dirname, 'package/fonts/NotoSans'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]'
        },
        use: {
          loader: 'url-loader',
        }
      }
    ]
  }
};

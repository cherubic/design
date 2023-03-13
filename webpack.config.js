const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

function tryResolve_(url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
  // when the importer throws
  try {
    return require.resolve(url, { paths: [path.dirname(sourceFilename)] });
  } catch (e) {
    return '';
  }
}

function tryResolveScss(url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
  return tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
      sourceFilename);
}

function materialImporter(url, prev) {
  if (url.startsWith('@material')) {
    const resolved = tryResolveScss(url, prev);
    return { file: resolved || url };
  }
  return { file: url };
}

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
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    hot: true
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ], 
                sourceMap: true,
              }
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'package/fonts'),
          path.resolve(__dirname, 'package/fonts/HarmonyOS_Sans'),
          path.resolve(__dirname, 'package/fonts/MiSans'),
          path.resolve(__dirname, 'package/fonts/NotoSans'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'asserts/fonts/[name][ext]'
        }
      }
    ]
  }
};

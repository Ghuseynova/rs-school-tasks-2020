// import  '@babel/polyfill';

const path = require('path');

require('@babel/polyfill');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: false,
  entry: {
    main: ['@babel/polyfill', './src/app/index.js'],
  },
  output: {
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc.json',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: `[path][name].[ext]`,
          },
          'img-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        devServer: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/img',
        to: 'img',
      },
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: ['bundle.js'],
    }),

    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      files: './src/**/*.s?(a|c)ss',
      fix: true,
    }),
  ],
};

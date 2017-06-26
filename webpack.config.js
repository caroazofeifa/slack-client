const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    javascript: './app.jsx',
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias:{
      'bootstrap-path': path.join(__dirname, '../node_modules/bootstrap-sass/assets/stylesheets/')
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  node: {
    fs: 'empty',
    tls: 'empty',
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: [/\.js$/, /\.jsx$/],
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: [/\.scss$/],
        use: [
          'style-loader', // paste the files in the css
          'css-loader', // recognice the imports
          'sass-loader',
        ],
      },
      {
        test: /\.(?:png|jpg|svg)$/,
        loader: 'url-loader',
        query: {
        // Inline images smaller than 10kb as data URIs        limit: 10000
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.ejs',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version'],
          }),
          precss(),
        ],
      },
    }),
  ],
};
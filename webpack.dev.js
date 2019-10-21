const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js', // or whatever
    path: path.resolve(__dirname, 'dist'), // or whatever
  },
  mode: 'development',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3 injects styles into js
          'css-loader', // 2 turns css into js
          'sass-loader', // 1 turns sass into css
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: './src/template-calories.html',
    }),
  ],
});

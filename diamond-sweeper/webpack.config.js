const webpack = require("webpack");
const process = require('process');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PUBLIC_PATH='/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
};

module.exports = {
    entry: {
      app: "./app/client/app.js"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: `bundle.js`,
        publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: BABEL_PRESET },
        { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: "[name].[ext]"
          }
        }
      ]
    },
    plugins: [new ExtractTextPlugin({ filename: "style.css", allChunks: true })],
    devServer: {
      contentBase: '.',
      watchContentBase: true
    }
};

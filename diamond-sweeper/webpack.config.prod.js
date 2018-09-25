const webpack = require("webpack");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PUBLIC_PATH='/assets/';
const OUTPUT_DIRECTORY = __dirname + `/dist/assets/`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
};

module.exports = {
    entry: {
      app: "./app/client/app.js",
      style: "./app/stylesheets/style.scss"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: `[name].js`
    },
    module: {
      rules: [
        { test: /\.js?$/, exclude: /node_modules/, use: BABEL_PRESET },
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
    plugins: [new ExtractTextPlugin("./style.css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: false,
            filename: '../index.html'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

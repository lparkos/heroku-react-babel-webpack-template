const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackConfig = require('./htmlwebpack.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const BASE = path.resolve('./');
const DIST = path.join(BASE, 'dist');
const SRC = path.join(BASE, 'src');
const SASS = path.join(BASE,'sass');


module.exports = {
  entry: {
    entry: SRC + '/index.jsx'
  },
  devtool: DEV ? 'inline-source-map' : 'false',
  devServer: {
    contentBase: DIST
  },
  plugins: [new DashboardPlugin(), new HtmlWebpackPlugin(htmlWebpackConfig), new ExtractTextPlugin({filename: 'main.css', allChunks: true})],
  output: {
    filename: '[name].bundle.js',
    path: DIST
  },
  resolve:{
    alias:{
      scss:SASS
    },
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/, /\.es6$/],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
             presets: ['react', 'es2015']
          }
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                use: [
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ],
                fallback: "style-loader" // used when css not extracted
            }
        ))
    },
    ]
  }
};

'use strict'

const execSync = require('child_process').execSync
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
const ASSETS_URL = '0.0.0.0:8080'

const cssFilename = 'static/css/[name].css'

// Default config
let devtool = ''

let entry = { bundle: ['babel-polyfill', 'whatwg-fetch', 'react-hot-loader/patch', './src/index.js'] }

let output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: '/'
}

let externals = {}

// TARGET overrides
switch (TARGET) {
  case 'start':
    devtool = 'cheap-module-eval-source-map'
    break
  case 'test':
    entry = ['./test/spec/index.js']
    output = {
      filename: 'test.bundle.js',
      path: 'dist/',
      publicPath: 'http://localhost:8081/tests/'
    }
    externals = [
      {
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true
      }
    ]
    break
}

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: TARGET !== 'build:webpack',
    'process.env.NODE_ENV': null
  }),
  new HtmlWebpackPlugin({
    template: 'public/views/index.ejs'
  }),
  new ExtractTextPlugin('styles.css')
]

module.exports = {
  devtool,
  entry,
  output,
  externals,
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract({
          filename: cssFilename,
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [require('postcss-flexbugs-fixes')]
              }
            },
            'less-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: TARGET !== 'build:webpack' ? 'url-loader' : `file-loader?publicPath=${ASSETS_URL}/&name=[name].[ext]`
      },
      { test: /\.json$/, loader: 'json' },
      { test: /fonts\/.*\.(woff(2)?|eot|ttf|svg)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', 'less', '.json'],
    alias: {
      src: path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      assets: path.join(__dirname, 'src/assets'),
      lib: path.join(__dirname, 'src/lib'),
      styling: path.join(__dirname, 'src/styling'),
      testMockData: path.join(__dirname, 'src/testMockData')
    }
  },
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins
}

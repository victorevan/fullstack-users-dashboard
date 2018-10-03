const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const ASSETS_URL = '0.0.0.0:8080';

let devtool = '';

let entry = ['@babel/polyfill', 'whatwg-fetch', './src/index.js'];

let output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: '/',
};

let externals = {};

// TARGET overrides
switch (TARGET) {
  case 'start':
    devtool = 'cheap-module-eval-source-map';
    break;
  case 'test':
    entry = ['@babel/polyfill', './test/spec/index.js'];
    output = {
      filename: 'test.bundle.js',
      path: 'dist/',
      publicPath: 'http://localhost:8081/tests/',
    };
    externals = [
      {
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true,
      },
    ];
    break;
  default:
    break;
}

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/views/index.ejs',
  }),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
  devtool,
  entry,
  output,
  externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: TARGET !== 'build:webpack' ? 'url-loader' : `file-loader?publicPath=${ASSETS_URL}/&name=[name].[ext]`,
      },
      { test: /\.json$/, use: 'json' },
      { test: /fonts\/.*\.(woff(2)?|eot|ttf|svg)/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    alias: {
      src: path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      assets: path.join(__dirname, 'src/assets'),
      lib: path.join(__dirname, 'src/lib'),
      styling: path.join(__dirname, 'src/styling'),
      testMockData: path.join(__dirname, 'src/testMockData'),
    },
  },
  devServer: {
    hot: true,
    inline: true,
    port: 8080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins,
};

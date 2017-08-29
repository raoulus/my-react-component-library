/* eslint quote-props: 0 */

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let entry = {
  app: [
    './demo/client/index.js'
  ],
  vendor: [
    'react',
    'react-dom',
    'react-router',
    'react-codemirror',
    'react-markdown',
    'react-redux',
    'redux',
    'redux-thunk',
    'superagent'
  ],
  babel: [
    'babel-standalone'
  ],
  'theme-v1': [
    './themes/v1/less/theme.less'
  ]
};

const componentFolder = path.resolve('components');
const components = fs.readdirSync(componentFolder);
components.forEach((component) => {
  if (component === '.DS_Store') return;
  entry[component] = [`./components/${component}/index.js`];
});

console.log(components);

module.exports = {
  resolve: {
    modules: [
      path.resolve('./demo/client'),
      path.resolve('./'),
      path.resolve('./node_modules')
    ],
    alias: {
      'theme-v1': path.resolve('themes', 'v1')
    }
  },
  entry: entry,
  output: {
    filename: '[name].js',
    publicPath: '/assets/',
    path: path.resolve('demo', 'public', 'assets')
  },
  plugins: [
    new CleanWebpackPlugin(['public/assets/']),
    new HtmlWebpackPlugin({
      template: 'demo/client/index.html',
      filename: '../index.ejs',
      favicon: 'demo/client/favicon.ico',
      minify: false,
      showErrors: true
    }),
    new ExtractTextPlugin('styles/[name].[chunkhash].css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    })
  ],
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.(json)$/, loader: 'json-loader'},
      {test: require.resolve('react'), loader: 'expose-loader?React'},
      {
        test: /\.(jsx|js)?$/,
        include: path.resolve('demo', 'client'),
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(jsx|js)?$/,
        include: path.resolve('components'),
        exclude: /node_modules/,
        loaders: ['expose?[name]', 'babel?plugins[]=add-module-exports']
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader?root=true'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]', include: path.resolve('demo', 'client')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'}
    ]
  },
  lessLoader: {
    lessPlugins: [
      require('less-plugin-glob')
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty'
  }
};

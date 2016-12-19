// const webpack = require('atool-build/lib/webpack');

// module.exports = function(webpackConfig, env) {
//   webpackConfig.babel.plugins.push('transform-runtime');

//   // Support hmr
//   if (env === 'development') {
//     webpackConfig.devtool = '#eval';
//     webpackConfig.babel.plugins.push('dva-hmr');
//   } else {
//     webpackConfig.babel.plugins.push('dev-expression');
//   }

//   // Don't extract common.js and common.css
//   webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
//     return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
//   });

//   // Support CSS Modules
//   // Parse all less files as css module.
//   webpackConfig.module.loaders.forEach(function(loader, index) {
//     if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
//       loader.include = /node_modules/;
//       loader.test = /\.less$/;
//     }
//     if (loader.test.toString() === '/\\.module\\.less$/') {
//       loader.exclude = /node_modules/;
//       loader.test = /\.less$/;
//     }
//     if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
//       loader.include = /node_modules/;
//       loader.test = /\.css$/;
//     }
//     if (loader.test.toString() === '/\\.module\\.css$/') {
//       loader.exclude = /node_modules/;
//       loader.test = /\.css$/;
//     }
//   });

//   return webpackConfig;
// };

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: {
    index:[path.resolve(__dirname, 'src/scripts/index.js')],
    router:[path.resolve(__dirname, 'src/scripts/router.js')]
  },
  target: 'node-webkit',
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, 'build/scripts'),
    filename: '[name].js',
    chunkFilename: "[name].chunk.js",
    publicPath:"/build/scripts/"
  },
  module: {
    //加载器配置
    loaders: [
      {test: /\.js$/,loader: 'babel-loader'},
      {test: /\.css$/,loader: "style-loader!css-loader"},
      {test: /.scss$/, loader: "style!sass"}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
    new CopyWebpackPlugin([{from: 'node_modules/monaco-editor/min/vs',to: 'vs'}])
  ]
};

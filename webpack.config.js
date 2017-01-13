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
    'components/main':[path.resolve(__dirname, 'src/scripts/components/main.js')],
    'components/phone':[path.resolve(__dirname, 'src/scripts/components/phone.js')],
    'components/phone-inset':[path.resolve(__dirname, 'src/scripts/components/phone-inset.js')],
    'editinfo/debug':[path.resolve(__dirname, 'src/scripts/editinfo/debug.js')],
    'editinfo/edit':[path.resolve(__dirname, 'src/scripts/editinfo/edit.js')],
    'editinfo/project':[path.resolve(__dirname, 'src/scripts/editinfo/project.js')],
    'editor/index':[path.resolve(__dirname, 'src/scripts/editor/index.js')],
    'jssdk/jssdk':[path.resolve(__dirname, 'src/scripts/jssdk/jssdk.js')],
    'jssdk/jssdk-callHander':[path.resolve(__dirname, 'src/scripts/jssdk/jssdk-callHander.js')],
    'menu/index':[path.resolve(__dirname, 'src/scripts/menu/index.js')],
    // 'nav/apps':[path.resolve(__dirname, 'src/scripts/nav/apps.js')],
    // 'nav/info':[path.resolve(__dirname, 'src/scripts/nav/info.js')],
    // 'nav/login':[path.resolve(__dirname, 'src/scripts/nav/login.js')],
    'platform/update':[path.resolve(__dirname, 'src/scripts/platform/update.js')],
    'platform/windows':[path.resolve(__dirname, 'src/scripts/platform/windows.js')],
    'router/router':[path.resolve(__dirname, 'src/scripts/router/router.js')],
    // 'components/editview':[path.resolve(__dirname, 'src/scripts/components/editview.js')],
  },
  target: 'node-webkit',
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, 'build/scripts'),
    publicPath:"/build/scripts/",
    filename: '[name].js',
    chunkFilename: "nav/[name].js"
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
  ]
};

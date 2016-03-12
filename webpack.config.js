var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /components/
      },
      {
        test: /components\/.*\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]-[local]--[hash:base64:5]',
      },
      {
        test: /\.(svg|eot|otf|woff|ttf|woff2)/,
        loader: 'file-loader?name=[name]@[hash].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      '#components': __dirname + '/src/components'
    }
  }
};

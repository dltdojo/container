var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    ddjbtc: './src/ddjbtc.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'build/')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },

  plugins: [
  ],

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
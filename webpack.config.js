var webpack = require('webpack');
var path = require('path');
var PROD = (process.env.NODE_ENV === 'production')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/cyclop'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: PROD ? 'cyclop.min.js' : 'cyclop.js',
    library: 'Cyclop',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ] : []
};
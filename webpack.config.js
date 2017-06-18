var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/cyclop'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'cyclop.js',
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
  plugins: []
};

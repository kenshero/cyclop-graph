var path = require('path');
module.exports = [
  {
    name: "main",
    devtool: 'eval',
    entry: [
      './index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'lib')
        }
      ]
    }
  },
  {
    name: "examples",
    devtool: 'eval',
    entry: [
      './index'
    ],
    output: {
      path: path.join(__dirname, 'examples/js'),
      filename: 'cyclop.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'lib')
        }
      ]
    }
  }
];
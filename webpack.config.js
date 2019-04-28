const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:  {
    create: './functions/create.js',
    list: './functions/list.js'
  },
  output: {
    path: __dirname + "/functions-public",
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()]
};
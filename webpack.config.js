const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:  {
    create: './functions/create.js', // TODO change to create.js
    list: './functions/list.js'
  },
  output: {
    path: __dirname + "/public",
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()]
};
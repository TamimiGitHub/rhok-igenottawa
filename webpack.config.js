const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:  {
    create: './functions/app.js', // TODO change to create.js
    list: './functions/list.js'
  },
  output: {
    path: __dirname + "/functions-packed",
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()]
};
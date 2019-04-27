const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:  {
    create: './functions/app.js'
  },
  output: {
    path: __dirname + "/functions-packed",
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()]
};
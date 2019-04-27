const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './functions/app.js',
  output: {
    path: __dirname + "/functions-packed",
    filename: 'app.js',
  },
  target: 'node',
  externals: [nodeExternals()]
};
const MongooseConnection = require('./mongoose.js');
const mongoose = new MongooseConnection();
 
exports.handler = function(event, context, callback) {
  // see https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false;
  // console.log(mongoose.connection);
  mongoose.connection;
  callback(null, {
      statusCode: 200,
      body: "Hello world"
  });
};

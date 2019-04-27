const MongooseConnection = require('./mongoose_connection.js');
const mongoose = new MongooseConnection();
 
exports.handler = function(event, context, callback) {
  // see https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false;
  mongoose.connection;
  console.log(event)
  callback(null, {
      statusCode: 200,
      body: "Listing"
  });
};

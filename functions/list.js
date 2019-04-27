 
exports.handler = function(event, context, callback) {
  // see https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event)
  callback(null, {
      statusCode: 200,
      body: "Listing"
  });
};

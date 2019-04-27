exports.handler = function(event, context, callback) {  
    callback(null, {
      statusCode: 200,
      body: "Create a event list in the db"
    });
  };
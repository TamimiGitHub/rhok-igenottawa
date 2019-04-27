const mongoose = require('mongoose');
const EventItem = require('../models/eventItem')
 
exports.handler = function(event, context, callback) {
  // see https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false;

  EventItem.find({}, {_id:0, eventName:1, description:1}).then((results) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(results)
  });
  })
};

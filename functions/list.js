require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')

let uri = process.env.CONNECTION_STRING;
//Connect to db
mongoose.
  connect(uri, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true
  })
  .then(() => console.log("Connection to MongoDB successful"))
  .catch(err => console.error("Failed to connect to MongoDB"))
 
 
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

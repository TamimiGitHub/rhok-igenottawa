require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('../models/eventItem')


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
  console.log(event)
  // see https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false;

  // Create a db entry for an event 
  let entry = new EventItem()
  entry.eventName = "Tai's Event"
  entry.description = "This event is hosted"
  entry.save().then(() => {
      console.log("saved in db")
      callback(null, {
        statusCode: 200,
        body: "Hello world"
      });
    })
    .catch(err => console.log(err))
};

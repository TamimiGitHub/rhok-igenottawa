require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('../models/eventItem')
const querystring = require('querystring')


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

  const params = querystring.parse(new Buffer(event.body,'base64').toString('ascii'));

  // Create a db entry for an event 
  let entry = new EventItem()
  entry.eventName = params.eventName
  entry.description = params.description
  entry.save().then(() => {
      console.log("saved in db")
      callback(null, {
        statusCode: 200,
        body: "Hello world"
      });
    })
    .catch(err => console.log(err))
};

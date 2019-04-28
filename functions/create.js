require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
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
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod != 'POST') {
    return invalidMethod(callback);
  }

  let params = querystring.parse(new Buffer(event.body,'base64').toString('ascii'));

  if (!paramsValid(params)) {
    return invalidParams(callback);
  }

  // Create a db entry for an event 
  let entry = new EventItem()
  entry.eventName = params.eventName
  entry.description = params.description
  entry.save().then(() => {
      console.log("saved in db")
      success(callback);
    })
    .catch(err => console.log(err))
};

const requiredParams = ["eventName", "description"];
function paramsValid(params) {
  let paramNames = Object.keys(params);
  for (let requiredParam of requiredParams) {
    if (!paramNames.includes(requiredParam)) {
      console.log("Missing required param ", requiredParam);
      return false;
    }
  }
  return true;
}

function invalidParams(callback) {
  callback(null, {
    statusCode: 400,
    body: `The following parameters are required: ${requiredParams}`
  });
}

function invalidMethod(callback) {
  callback(null, {
    statusCode: 400,
    body: "This endpoint only accepts POSTs."
  });
}

function success(callback) {
  callback(null, {
    statusCode: 301,
    headers: {
      Location: 'list',
    },
    body: ''
  });
}
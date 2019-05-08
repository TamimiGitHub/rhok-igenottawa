require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
const querystring = require('querystring')
// var cloudinary = require('cloudinary').v2

// process.env.CLOUDINARY_URL
// cloudinary.uploader.upload("my_picture.jpg", function(error, result) { console.log(result) });

let uri = process.env.CONNECTION_STRING;
//Connect to db
mongoose.
  connect(uri, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true
  })
  .then(() => console.log("Connection to MongoDB successful"))
  .catch(err => console.error("Failed to connect to MongoDB: ", err))
 
exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod != 'POST') {
    return invalidMethod(callback);
  }

  let qstring = event.body;
  if (event.isBase64Encoded) {
    qstring = new Buffer(event.body,'base64').toString('ascii');
  }

  let params = querystring.parse(qstring);
  // console.log(params)

  // if (!paramsValid(params)) {
  //   return invalidParams(callback);
  // }

  // Create a db entry for an event 
  let entry = new EventItem()
  entry.eventTitle = params.eventTitle
  entry.location = params.location
  entry.eventDesc = params.eventDesc
  entry.date = params.eventDate
  entry.startTimeHour = params.startTimeHour
  entry.startTimeMinute = params.startTimeMinute
  entry.endTimeHour = params.endTimeHour
  entry.endTimeMinute = params.endTimeMinute
  entry.website = params.website
  entry.organizationName = params.organizationName
  entry.contactName = params.contactName
  entry.contactEmail = params.contactEmail

  entry.save().then(() => {
      console.log("saved in db")
      success(callback);
    })
    .catch(err => console.log(err))
};

const requiredParams = ["eventTitle", "eventDesc"];
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
      Location: '/list',
    },
    body: ''
  });
}

function uploadImage(file, options, callback){
  cloudinary.uploader.unsigned_upload("../public/images/logo.png", "eventsportal", 
    function(error, result) {console.log(result, error) });
}

function extractImage() {

}
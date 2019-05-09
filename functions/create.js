require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
const querystring = require('querystring')
const htmlEscape = require('escape-html')

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

  // if (!paramsValid(params)) {
  //   return invalidParams(callback);
  // }

  // Create a db entry for an event 
  let entry = new EventItem()
  entry.eventTitle = htmlEscape(params.eventTitle)
  entry.location = htmlEscape(params.location)
  entry.eventDesc = htmlEscape(params.eventDesc)
  entry.date = htmlEscape(params.eventDate)
  entry.startTimeHour = htmlEscape(params.startTimeHour)
  entry.startTimeMinute = htmlEscape(params.startTimeMinute)
  entry.endTimeHour = htmlEscape(params.endTimeHour)
  entry.endTimeMinute = htmlEscape(params.endTimeMinute)
  entry.website = htmlEscape(params.website)
  entry.organizationName = htmlEscape(params.organizationName)
  entry.contactName = htmlEscape(params.contactName)
  entry.contactEmail = htmlEscape(params.contactEmail)
  entry.imageUrl = imageUrlOrRandom(htmlEscape(params.imageUrl))

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

function imageUrlOrRandom(imageUrl) {
  if (imageUrl != null && imageUrl.length > 0) {
    return imageUrl;
  }
  return randomImage();
}

const images = [
  'temp_image.png',
  'stock1.jpeg',
  'stock2.jpeg',
  'stock3.jpeg',
  'stock4.jpg',
];

function randomImage() {
  return '/images/' + images[Math.floor(Math.random() * images.length)];
}
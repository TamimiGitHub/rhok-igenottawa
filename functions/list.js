require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
const Handlebars = require('handlebars');
const fs = require('fs')

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

  EventItem.find({}, {_id:0, eventName:1, description:1}).then((results) => {
    const eventList = { events: results}
    callback(null, {
      statusCode: 200,
      body: renderEventList(eventList)
  });
  })
};

const eventSource = `<p>Events:<ul>{{#events}}<li>Event Name: {{eventName}}</li>Description: {{description}}{{/events}}</ul>`;
const eventTemplate = Handlebars.compile(eventSource);

function renderEventList(eventList) {
  return eventTemplate(eventList)
}
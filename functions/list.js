require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
const Handlebars = require('handlebars');

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

  var source = "<p>Events: " +
              "<ul>{{#events}}<li>Event Name: {{eventName}}</li>Description: {{description}}{{/events}}</ul>";

  var template = Handlebars.compile(source);
  var eventList = {"events":[{"eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": "Tai's Event", "description": 'This event is hosted' },
                            { "eventName": 'Mickey', "description": 'Mouse' },
                            { "eventName": 'Rey', "description": 'Club event' },
                            { "eventName": 'Seniors', "description": 'Big party'}]}

  var output = template(eventList)
  EventItem.find({}, {_id:0, eventName:1, description:1}).then((results) => {
    console.log(results)
    callback(null, {
      statusCode: 200,
      // body: JSON.stringify(results)
      body: output
  });
  })
};

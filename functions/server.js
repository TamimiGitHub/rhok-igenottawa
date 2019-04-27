const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
var Schema = mongoose.Schema;

// Connect to the db
mongoose.
    connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => console.log("Connection to MongoDB successful"))
    .catch(err => console.error("Failed to connect to MongoDB"))

// const collectionName = 'events'
const collectionName = 'events-test'

// Create Schema
var eventSchema = new Schema({
    name: 'String',
    description: 'String',
});

const entryModel = mongoose.model(collectionName, eventSchema);

let event = new entryModel()
event.name = "New Event"
event.description = "This event is hosted"
event.save().then(() => console.log("saved in db"))
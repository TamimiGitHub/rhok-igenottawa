var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const collectionName = 'events'
const collectionName = 'events-test'

// Create Schema
var eventSchema = new Schema({
    eventName: 'String',
    description: 'String',
});

module.exports = mongoose.model(collectionName, eventSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const collectionName = 'events'
// const collectionName = 'events-test'

// Create Schema
var eventSchema = new Schema({
    eventTitle: 'String',
    location: 'String',
    eventDesc: 'String',
    date: 'String',
    startTimeHour: 'String',
    startTimeMinute: 'String',
    endTimeHour: 'String',
    endTimeMinute: 'String',
    website: 'String',
    organizationName: 'String',
    contactName: 'String'
});

module.exports = mongoose.model(collectionName, eventSchema);

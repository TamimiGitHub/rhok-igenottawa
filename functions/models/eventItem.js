require('dotenv').config();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const collectionName = process.env.EVENT_COLLECTION || 'events'

// Create Schema
var eventSchema = new Schema({
    eventTitle: 'String',
    location: 'String',
    eventDesc: 'String',
    date: 'Date',
    startTimeHour: 'String',
    startTimeMinute: 'String',
    endTimeHour: 'String',
    endTimeMinute: 'String',
    website: 'String',
    organizationName: 'String',
    contactName: 'String',
    contactEmail: 'String',
    imageUrl: 'String'
});

module.exports = mongoose.model(collectionName, eventSchema);

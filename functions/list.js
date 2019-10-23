require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')
var dateFormat = require('dateformat');
const normalizeUrl = require('normalize-url');
const linkifyUrls = require('linkify-urls');

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

  EventItem.find().sort( {date: -1} ).then((results) => {
    callback(null, {
      statusCode: 200,
      body: renderEventList(results)
  });
  })
};

const header = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--link rel="icon" href="../../../../favicon.ico"-->

    <title>iGen Ottawa Events Portal - List Events</title>

    <!-- Bootstrap core CSS -->
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/list.css" rel="stylesheet">

    <!-- Common styles for reuse across pages -->
    <link href="/common.css" rel="stylesheet">

    <!-- Pure CSS; consistent styling for Home button. -->
    <link rel="stylesheet" href="pure-css/pure-min.css">
  </head>

  <body>

  <div class="container">

    <div class="pure-g">
      <div class="pure-u-1 text-center"><img src="/images/logo2.png" alt="iGen Ottawa Logo"></div>
      <div class="pure-u-1 text-center">
        <a class="pure-button" href="https://www.igenottawa.ca/">Home/Accueil</a>
        <a class="pure-button" href="/create">Post an Event/Afficher un événement</a>
      </div>
    </div>

    <div class="text-center"><h1>Events List/Liste des événements</h1></div>
    <div class="card-columns">
`

const footer = `
</div>
</div>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="bootstrap/js/jquery-slim.min.js"></script>
<script src="/bootstrap/js/popper.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/bootstrap/js/holder.min.js"></script>
</body>
</html>
`

function renderEventList(eventList) {
  let events ='';
  for (let event of eventList) {
    events += renderEvent(event)
  }
  return header + events + footer;
}

function renderEvent(event) {
  let email = ''
  let website = event.website
  if(event.contactEmail) {
    email = ` <br> <u>Email:</u> <a href="mailto:${event.contactEmail}">${event.contactEmail}</a>`
  }

  if(event.website) {
    website = normalizeUrl(event.website)
  }

  return `
    <div class="card">
      <img class="card-img-top" src="${renderImage(event.imageUrl)}" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title"><b><a href="${website}" target="_blank">${event.eventTitle}</a></b></h4>
        <p class="card-text"><u>Organization Name:</u> ${event.organizationName} <br> <u>Contact Name:</u> ${event.contactName}${email}</p>
        <br class="card-text">${dateFormat(event.date, "UTC:dddd, mmmm dS, yyyy")}</br>
        <p class="card-text">${renderTime(event)}Location: ${event.location} <a href="http://maps.google.com?q=${event.location}" target="_blank">(map)</a></p>
        <p class="card-text">---------</p>
        <p class="card-text">${renderDesc(event.eventDesc)}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> -->
          </div>
        </div>
      </div>
    </div>
  `
}

function renderTime(event) {
  if (event.startTimeHour || event.startTimeMinute || event.endTimeHour || event.endTimeMinute) {
    return `${event.startTimeHour}:${event.startTimeMinute} - ${event.endTimeHour}:${event.endTimeMinute} <br> `;
  }
  return '';
}

function renderDesc(desc) {
  // Replace newlines in description with brs to render multiline descriptions
  desc = desc.trim().replace(/\n/g, '<br>');

  // linkify-urls
  desc = linkifyUrls(desc, {attributes: {target: "_blank"} })

  return desc
}

// If URL is from Cloudinary, rewrite it to apply a resize transformation
function renderImage(imageUrl) {
  if (imageUrl == null) {
    return imageUrl;
  }
  if (imageUrl.startsWith('https://res.cloudinary.com')) {
    return imageUrl.replace(/(.+?\/image\/upload\/)(.+)/, '$1w_600/$2')
  }
  return imageUrl;
}

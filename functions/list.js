require('dotenv').config()
const mongoose = require('mongoose');
const EventItem = require('./models/eventItem.js')

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

  EventItem.find().then((results) => {
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

    <title>Album example for iGen</title>

    <!-- Bootstrap core CSS -->
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/list.css" rel="stylesheet">
  </head>

  <body>


  <div class="album py-5 bg-light">
  <div class="container">

    <div class="row">
`

const footer = `
</div>
</div>
</div>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="bootstrap/js/jquery-slim.min.js"><\/script>')</script>
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
  return `
  <div class="col-md-4">
  <div class="card mb-4 box-shadow">
    <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap">
    <div class="card-body">
      <p class="card-text">${event.eventTitle}</p>
      <p class="card-text">${event.eventDesc}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> -->
        </div>
      </div>
    </div>
  </div>
</div>   
  `
}

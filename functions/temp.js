require('dotenv').config()
var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

cloudinary.uploader.unsigned_upload("../public/images/logo.png", "eventsportal", 
  function(error, result) {console.log(result, error) });
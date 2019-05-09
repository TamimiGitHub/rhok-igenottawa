// Returns a signed URL for Cloudinary uploads which can be used client-side without divulging API secret
require('dotenv').config();
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signFileUploadRequest(process.env.API_SECRET, process.env.API_KEY))
  });
}

// See comments here: https://support.cloudinary.com/hc/en-us/articles/207885595-How-can-I-generate-the-signed-upload-payload-on-my-server-
function signFileUploadRequest(apiSecret, apiKey) {
  var millisecondsToSeconds = 1000;
  var timestamp = Math.round(Date.now() / millisecondsToSeconds);
  // generate the signature using the current timestamp and any other desired Cloudinary params
  var signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, apiSecret);
  return {
    apiUrl: cloudinary.utils.api_url('upload', { resource_type:'auto' }),
    signature: signature,
    timestamp: timestamp,
    apiKey: apiKey
  };
}
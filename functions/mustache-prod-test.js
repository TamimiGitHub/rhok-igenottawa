const fs = require('fs');
const Handlebars = require('handlebars');

var source = fs.readFileSync(__dirname + '/mustache-template.txt', 'utf8');

var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
console.log()

 
exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  callback(null, {
    statusCode: 200,
    body: template(data)
  })
};

console.log(template(data));
foo = require('./foo.js')

exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World" + foo.foo
    });
};
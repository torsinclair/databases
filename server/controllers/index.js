var models = require('../models');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(messages) {
        res.writeHead(200, defaultCorsHeaders);
        var results = {results: messages};
        res.end(JSON.stringify(results));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var newMsg = {
        username: req.body.username,
        room: req.body.roomname,
        text: req.body.text
      }; 
      models.messages.post(newMsg, function(messages) {
        res.writeHead(201, defaultCorsHeaders);
        res.end(JSON.stringify(messages));        
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('hi');

    },
    post: function (req, res) {
      console.log('hi');

    }
  }
};


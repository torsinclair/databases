var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.connection.query('SELECT * FROM messages', function(err, results) {
        if ( err ) { throw err; }
        cb(results);
      });
    }, // a function which produces all the messages
    post: function (msg, cb) {
      console.log(msg);
      db.connection.query('INSERT INTO messages SET ?', msg, function(err, results) {
        if ( err ) { throw err; }
        cb(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function () {
      
    }
  }
};


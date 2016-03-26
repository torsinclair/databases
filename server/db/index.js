var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.connection = connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pw',
  database: 'chat'
  //chat
});

connection.connect();

  
// dbConnection.connect();

// dbConnection.query('SELECT ' + ' FROM ', function(err, rows, fields) {
//   //
//   //
//   //

// });

// dbConnection.end();

// var tablename = "messages"; // TODO: fill this out


const mysql = require('mysql2');
// connects to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'f@4h4NCc$qVoKv',
    database: 'manager'
  },
  console.log("connected to the manager database.")
);

module.exports = db;
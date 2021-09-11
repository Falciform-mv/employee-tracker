

const mysql = require('mysql2');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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





// default response for any other request (not found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
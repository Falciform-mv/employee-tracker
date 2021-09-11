

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


// displays all employees from database table
// db.query(`SELECT * FROM employees`, (err, rows) => {
//   console.log(rows);
// });

// gets a single employee
// db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// deletes an employee
// db.query(`DELETE FROM employees WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// creates an employee
const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?, ?)`;
const params = [1, 'Shane', 'Cross', 2, 2];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



// default response for any other request (not found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
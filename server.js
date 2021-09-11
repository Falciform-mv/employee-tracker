
const inputCheck = require('./utils/inputCheck');

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
app.get ('/api/employees', (req, res) => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// gets a single employee
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// deletes an employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// creates an employee
app.post('/api/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data:body
    });
  });

});



// default response for any other request (not found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

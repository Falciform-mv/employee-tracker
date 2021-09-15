
const express = require('express');
// connects to database
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
// const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api', apiRoutes);

// default response for any other request (not found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// start server after db connection
db.connect(err => {
  if (err) throw err;
  console.log('database connected');
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
  promptUser();
});



const inquirer = require('inquirer');
const table = require('console.table');
// database connection
// const db = require('./db/connection');

const questions = [
  {
    type: 'list',
    name: 'start',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role'
    ]
  }
]

const questions2 = [
  {
    type: 'input',
    name: 'first_name',
    message: 'What is the employees first name'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'What is the employees last name'
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'what is the employees role id'
  },
  {
    type: 'input',
    name: 'manager_id',
    message: 'what is the employees manager id'
  }
]

const promptUser = () => {
  return inquirer
  .prompt(questions)
  .then(function(startAnswers) {
    let choice = startAnswers.start;
    switch(choice) {
      case 'View all departments':
        // function that displays departments table;
        viewDepartment()
        break;
      case 'View all roles':
        // function that displays roles table;
        viewRoles()
        break;
      case 'View all employees':
        // function that displays employees table;
        viewEmployees();

        break;
      case 'Add a department':
        // function that writes SQL add department to database;
        break;
      case 'Add a role':
        // function that adds role to database;
        break;
      case 'Add an employee':
        // adds employee to database;
        addEmployee();
        break;
      case 'Update employee role':
        // changing employee role in database
        break;
    }
    
  });
  
}


// BUnch o' functions
// 
// 
let viewDepartment = function() {
  const sql = `SELECT * FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        console.log("error incurred");
      }
      let department = table.getTable(rows)
      console.table(department)
    });
    promptUser();
}

let viewRoles = function() {
  const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log("error occurred");
      }
      let role = table.getTable(rows)
      console.table(role);
    });
    promptUser();
}

let viewEmployees = function() {
  const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log("error acquired");
      }
      let employee = table.getTable(rows)
      console.table(employee);
    });
    promptUser();
}

let addEmployee = function() {

  // separate inquirer questions values pass into params
  inquirer.prompt(questions2).then(function(addAnswers) {
    console.log(addAnswers.first_name)
    addEmployees(addAnswers)
  });
}

let addEmployees = function(data) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id )
    VALUES (?, ?, ?, ?)`;
    const params = [data.first_name, data.last_name, data.role_id, data.manger_id];
    db.query(sql, params, (err, result) => {
      if (err) {
       console.log("I'm an error")
      }
      console.log("employee created")
      // view all employees fucntion goes here
      viewEmployees();
    });


}
  
    // const p = ["Jerry", "Seinfeld", "2", "1"]

    




const inquirer = require('inquirer');
const table = require('console.table');
// database connection
const db = require('./db/connection');

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

const promptUser = () => {
  return inquirer
  .prompt(questions)
}

let viewDepartment = function() {
  const sql = `SELECT * FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        console.log("error incurred");
      }
      let department = table.getTable(rows)
      console.table(department)
    });
}

promptUser()
.then(function(startAnswers) {
  let choice = startAnswers.choices;
  switch(choice) {
    case 'View all departments':
      // function that displays departments table;
      viewDepartment()
      break;
    case 'View all roles':
      // function that displays roles table;
      break;
    case 'View all employees':
      // function that displays employees table;
      break;
    case 'Add a department':
      // function that writes SQL add department to database;
      break;
    case 'Add a role':
      // function that adds role to database;
      break;
    case 'Add an employee':
      // adds employee to database;
      break;
    case 'Update employee role':
      // changing employee role in database
      break;
  }
  
});
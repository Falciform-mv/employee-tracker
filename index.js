
const inquirer = require('inquirer');

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


promptUser()
.then(function(startAnswers) {
  console.log(startAnswers);
  
});
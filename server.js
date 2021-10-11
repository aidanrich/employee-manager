// const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const { Server } = require('http');

require('dotenv').config()

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_db database.`)
);

// needs routes?

// I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const questionsMain = {
  type: 'list',
  messsage: 'What would you like to do?',
  name: 'main',
  choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
};

// prompt leads into switchcase
function hubQuestions(){
inquirer.prompt(questionsMain)
  .then(answer => {
    switch (answer.main) {
      case "View all departments":
        viewDept()
        break;
      case "View all roles":
        viewRoles()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "Add a department":
        addDept()
        break;
      case "Add a role":
        addRole()
        break;
      case "Add an employee":
        addEmployee()
        break;
      case "Update an employee role":
        updateRole()
        break;
      // quit option?
      case "Quit":
        quit()
        break;
      default:
        break;
    }
  });
}

function viewDept() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    hubQuestions();
  });
  
};

function viewRoles() {
  db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
    hubQuestions();
  })
  
};

function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    hubQuestions();
  });
};

function addDept() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new departments ID number?',
      name: 'newdepID'
    },
    {
      type: 'input',
      messsage: 'What is the name of the new department?',
      name: 'deptnameadd'
    },
  ])
  .then(answer => {

  })
};

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      messsage: 'What is the title of the new job role?',
      name: 'roleTitle'
    },
    {
      type: 'input',
      messsage: 'What is the salary of the new job role?',
      name: 'roleSalary'
    },
    {
      type: 'list',
      messsage: 'What department does this role belong to?',
      name: 'roleDept',
      choices: ["Entertainers", "Killer Clowns"]
    }
  ])
  .then
};

// function addEmployee() {};

// function updateRole() {};



function quit() {
  // kinda janky
  // const serverClose = app.listen(PORT);
  // serverClose.close();
  process.exit();
}

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


hubQuestions();
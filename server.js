const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASS,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});

db.query('SELECT * FROM roles', function (err, results) {
  console.log(results);
});

db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});

// needs routes?

// I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const questionsMain = {
  type: 'list',
  messsage: 'What would you like to do?',
  name: 'main',
  choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
};

// prompt leads into switchcase

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
      default:
        break;
    }
  });

function viewDept() {};

function viewRoles() {};

function viewEmployees() {};

function addDept() {};

function addRole() {};

function addEmployee() {};

function updateRole() {};


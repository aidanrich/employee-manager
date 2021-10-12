const mysql = require('mysql2');
const inquirer = require('inquirer');


require('dotenv').config()


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


// I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const questionsMain = {
  type: 'list',
  message: "What would you like to do?",
  name: 'main',
  choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
};

// prompt leads into switchcase
function hubQuestions() {
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
  inquirer.prompt(
    {
      type: 'input',
      name: 'dep_name',
      message: "What is the name of the new department?",
    },
  )
    .then(answer => {
      db.query(`INSERT INTO department SET ?`, answer, function (err, results) {
        if (err) throw err;
        viewDept()

      })
    })
};

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the title of the new job role?',
      name: 'title'
    },
    {
      type: 'input',
      message: 'What is the salary of the new job role?',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'What department does this role belong to?',
      name: 'department_id',
      choices: ["Entertainers", "Killer Clowns"]
    }
  ])
    .then(answer => {
      if (answer.department_id === "Entertainers") {
        answer.department_id = '1'
      } else answer.department_id = '2'
      //  [answer.title, newSalary, answer.department_id],
      db.query(`INSERT INTO roles SET ?`, answer, function (err, results) {
        if (err) throw err;
        viewRoles()

      })
    })
};

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the first name of the new clown?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'What is the last name of the new clown?',
      name: 'last_name'
    },
    {
      type: 'list',
      message: 'What role are we assigning our new clown?',
      name: 'role_id',
      choices: ["Clown Chief", "Clown Novice", "Scary Clown", "Painted Goblin"]
    }
  ])
    .then(answer => {
      if (answer.role_id === "Clown Chief") {
        answer.role_id = '1'
      } else if (answer.role_id === "Clown Novice") {
        answer.role_id = '2'
      } else if (answer.role_id === "Scary Clown") {
        answer.role_id = '3'
      } else answer.role_id = '4'
        
      //  [answer.title, newSalary, answer.department_id],
      db.query(`INSERT INTO employee SET ?`, answer, function (err, results) {
        if (err) throw err;
        viewEmployees()

      })
    })
};

function updateRole() { };



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
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

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
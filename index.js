const mysql = require('mysql2')
const inquirer = require('inquirer')
require('dotenv').config()
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: process.env.password,
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );
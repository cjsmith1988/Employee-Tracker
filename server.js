const inquirer = require('inquirer');
//const db = require('./db/database');
const cTable = require('console.table');
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Ranfunk1988*',
  database: 'employeeManagementDB'
});

// Connect to database
 connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  afterConnection();
});

afterConnection = () => {
    connection.query('SELECT * FROM employees', function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  };
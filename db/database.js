const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Ranfunk1988*',
  database: 'employeeManagement'
});


// Connect to database
 const db = connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  createProduct();
});

module.exports = db;
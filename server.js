
const cTable = require('console.table');
//const mysql = require('mysql2');
var connection = require('./db/database.js');
const { promptUser } = require('./utils/inqPrompts.js');
const { getEmployeeChoices,getDepartmentChoices,getRoleChoices } = require('./utils/sqlQueries.js');
var employeeList = [];
const departmentList = [];
const roleList = [];


getEmployeeChoices()
   .then(data => {   
        return getDepartmentChoices(data);
    })
    .then(data => { 
        return getRoleChoices(data);
    })
    .then(data => {  
        return promptUser(data.employeeList,data.departmentList,data.roleList);
    })
    .then(data => {
        console.log(data); 
          
    })
    .catch(err => {
        console.log(err);
    }); 





//connection.end();



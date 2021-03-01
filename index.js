
const cTable = require('console.table');
//const mysql = require('mysql2');
var connection = require('./db/database.js');
const { promptUser } = require('./utils/inqPrompts.js');
const { getEmployeeChoices,
    getDepartmentChoices,
    getRoleChoices,
    getAllDepartments,
    getAllRoles,
    getAllEmployees } = require('./utils/sqlQueries.js');
var employeeList = [];
const departmentList = [];
const roleList = [];

console.log(`        
 /$$$$$$$$                         /$$                                              
 | $$_____/                        | $$                                              
 | $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$       
 | $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$      
 | $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$      
 | $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/      
 | $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$      
 |________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/      
                         | $$                     /$$  | $$                          
                         | $$                    |  $$$$$$/                          
                         |__/                     \______/                           
  /$$      /$$                                                                       
 | $$$    /$$$                                                                       
 | $$$$  /$$$$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$            
 | $$ $$/$$ $$ |____  $$| $$__  $$ |____  $$ /$$__  $$ /$$__  $$ /$$__  $$           
 | $$  $$$| $$  /$$$$$$$| $$  \ $$  /$$$$$$$| $$  \ $$| $$$$$$$$| $$  \__/           
 | $$\  $ | $$ /$$__  $$| $$  | $$ /$$__  $$| $$  | $$| $$_____/| $$                 
 | $$ \/  | $$|  $$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$                 
 |__/     |__/ \_______/|__/  |__/ \_______/ \____  $$ \_______/|__/                 
                                             /$$  \ $$                               
                                            |  $$$$$$/                               
                                             \______/                                
    `);

startApplication = () => {
   
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
        switch (data.mainChoice) {
            case "View All Departments":
                getAllDepartments().then(data => {  
                    console.table(data);
                    startApplication();
                })
              break;
            case "View All roles":
                getAllRoles().then(data => {  
                    console.table(data);
                    startApplication();
                })
                break;
            case "View All Employees":
                getAllEmployees().then(data => {  
                    console.table(data);
                    startApplication();
                })
                break;
            case "View Employee by Manager":
            
                break;
            case "View Employee by department":
        
                break;
            case "View total utilized budget by department":
        
                break;
            case "Add a Department":
    
                break;
            case "QUIT":
                connection.end();
                break;
            default:
              //text = '';
              connection.end();
          }
    })
    .catch(err => {
        console.log(err);
    });
};
 
startApplication();


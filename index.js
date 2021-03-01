
const cTable = require('console.table');
//const mysql = require('mysql2');
var connection = require('./db/database.js');
const { promptUser } = require('./utils/inqPrompts.js');
const { getEmployeeChoices,
    getDepartmentChoices,
    getRoleChoices,
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    getAllEmployeesByManager,
    getAllEmployeesByDepartment,
    getBudgetByDepartment,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee } = require('./utils/sqlQueries.js');
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
        return getDepartmentChoices(data.namesList);
    })
    .then(data => { 
        return getRoleChoices(data);
    })
    .then(data => {  
        return promptUser(data.employeeList,data.departmentList,data.roleList);
    })
    .then(data => {
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
                getAllEmployeesByManager().then(data => {  
                    console.table(data);
                    startApplication();
                })
                break;
            case "View Employee by department":
                getAllEmployeesByDepartment().then(data => {  
                    console.table(data);
                    startApplication();
                })
                break;
            case "View total utilized budget by department":
                getBudgetByDepartment().then(data => {  
                    console.table(data);
                    startApplication();
                })        
                break;
            case "Add a Department":
                addDepartment(data.addDepartment).then(data => {  
                    startApplication();
                })
                break;
            case "Add a Role":
                getDepartmentChoices(data).then(data => {
                    let newData = data.employeeList;
                    let departmentID = data.departmentList.indexOf(newData.departmentChoice)+1;
                    newData.departmentID = departmentID;
                    addRole(newData).then(data => {  
                        startApplication();
                    })
                })
                break;
                updateEmployeeManager
                console.log(newData);
            case "Add an Employee":
                getRoleChoices(data).then(data => { 
                    let roleID = data.roleList.indexOf(data.employeeList.roleChoice)+1;
                    data.employeeList.roleID = roleID;
                    let newData = data.employeeList;
                    getEmployeeChoices(newData).then(data => {
                        let managerID = data.namesList.indexOf(data.employeeList.managerChoice)+1;
                        data.employeeList.managerID = managerID;
                        let newData = data.employeeList;
                        addEmployee(newData).then(data => {  
                            startApplication();
                        })
                    })
                })
                break;
            case "Update an Employee's Role":
                getRoleChoices(data).then(data => { 
                    let roleID = data.roleList.indexOf(data.employeeList.roleChoice)+1;
                    data.employeeList.roleID = roleID;
                    let newData = data.employeeList;
                    getEmployeeChoices(newData).then(data => {
                        let employeeID = data.namesList.indexOf(data.employeeList.employeeChoice)+1;
                        data.employeeList.employeeID = employeeID;
                        let newData = data.employeeList;
                        //console.log(newData);
                        updateEmployeeRole(newData).then(data => {  
                            startApplication();
                        })
                    })
                })        
                break;
            case "Update an Employee's Manager":
                getEmployeeChoices(data).then(data => { 
                    let managerID = data.namesList.indexOf(data.employeeList.managerChoice)+1;
                    let employeeID = data.namesList.indexOf(data.employeeList.employeeChoice)+1;
                    data.employeeList.managerID = managerID;
                    data.employeeList.employeeID = employeeID;
                    let newData = data.employeeList;
                    updateEmployeeManager(newData).then(data => {  
                        startApplication();
                    })
                })        
                break;
            case "Delete a Department":
                getDepartmentChoices(data).then(data => { 
                    let departmentID = data.departmentList.indexOf(data.employeeList.departmentChoice)+1;
                    data.employeeList.departmentID = departmentID;
                    let newData = data.employeeList;
                    //console.log(newData);
                    deleteDepartment(newData).then(data => {  
                        startApplication();
                    })
                })        
                break;
            case "Delete a Role":
                getRoleChoices(data).then(data => { 
                    let roleID = data.roleList.indexOf(data.employeeList.roleChoice)+1;
                    data.employeeList.roleID = roleID;
                    let newData = data.employeeList;
                    //console.log(newData);
                    deleteRole(newData).then(data => {  
                        startApplication();
                    })
                })        
                break;
            case "Delete an Employee":
                getEmployeeChoices(data).then(data => { 
                    let employeeID = data.namesList.indexOf(data.employeeList.employeeChoice)+1;
                    data.employeeList.employeeID = employeeID;
                    let newData = data.employeeList;
                    console.log(newData);
                    deleteEmployee(newData).then(data => {  
                        startApplication();
                    })
                })        
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



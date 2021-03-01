const { promptUser } = require('../utils/inqPrompts.js');
var connection = require('../db/database');

getEmployeeChoices = (master) =>
{    
    let employeeList = [];
    if (master){
        employeeList = master;
    }
    const sql = `SELECT first_name, last_name FROM employees`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        const namesList = [];
            for (let i = 0; i < res.length; i++) {
                namesList[i] = `${res[i].first_name} ${res[i].last_name}`;
                }
            resolve({employeeList,namesList});
        }); 
    }); 
};

getDepartmentChoices = (master) =>
{    
    let employeeList = master; 
    const sql = `SELECT name FROM departments`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        const departmentList = [];
            for (let i = 0; i < res.length; i++) {
                departmentList[i] = `${res[i].name}`;
                }
            //master.push(departmentList);
            resolve({employeeList,departmentList});
        }); 
    }); 
};

getRoleChoices = (master) =>
{    
    let employeeList = [];
    let departmentList = [];
    if (master.employeeList){
    employeeList = master.employeeList;
    }
    if (master.departmentList){
    departmentList = master.departmentList;
    }
    if (master.mainChoice === 'Add an Employee'){
        employeeList = master;
    }
    if (master.mainChoice === "Update an Employee's Role"){
        employeeList = master;
    }
    const sql = `SELECT title FROM roles`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        const roleList = [];
            for (let i = 0; i < res.length; i++) {
                roleList[i] = `${res[i].title}`;
                }
            resolve({employeeList,departmentList,roleList});
        }); 
    }); 
};
getAllDepartments = () =>
{    
    const sql = `SELECT departments.id,departments.name AS department FROM departments`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
getAllRoles = () =>
{    
    const sql = `SELECT roles.id,roles.title AS role, roles.salary FROM roles`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
getAllEmployees = () =>
{    
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(employeesb.first_name," ",employeesb.last_name) AS Manager  
                FROM employees 
                LEFT JOIN employees AS employeesb ON employees.manager_id = employeesb.id
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                `;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
getAllEmployeesByManager = () =>
{    
    const sql = `SELECT CONCAT(employeesb.first_name," ",employeesb.last_name) AS Manager, employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary  
                FROM employees 
                LEFT JOIN employees AS employeesb ON employees.manager_id = employeesb.id
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                ORDER BY Manager DESC
                `;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
getAllEmployeesByDepartment = () =>
{    
    const sql = `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(employeesb.first_name," ",employeesb.last_name) AS Manager 
                FROM employees 
                LEFT JOIN employees AS employeesb ON employees.manager_id = employeesb.id
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                ORDER BY department`;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
getBudgetByDepartment = () =>
{    
    const sql = `SELECT departments.name AS department, SUM(roles.salary) utilized_budget
                FROM employees 
                LEFT JOIN employees AS employeesb ON employees.manager_id = employeesb.id
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                GROUP BY department
                `;
    const params = [];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};
addDepartment = (departmentName) =>
{    
    const sql = `INSERT INTO departments SET ?`;
    const params = [
        {name: departmentName}
    ];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(console.log(res.affectedRows + ' New Department Added!\n')); 
        });
    }); 
};
addRole = (newData) =>
{    
    const sql = `INSERT INTO roles SET ?`;
    const params = [
        {title: newData.addRoleTitle,
        salary: newData.addRoleSalary,
        department_id: newData.departmentID}
    ];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(console.log(res.affectedRows + ' New Role Added!\n')); 
        });
    }); 
};
addEmployee = (newData) =>
{    
    const sql = `INSERT INTO employees SET ?`;
    const params = [
        {first_name: newData.addFirstName,
        last_name: newData.addLastName,
        role_id: newData.roleID,
        manager_id: newData.managerID}
    ];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(console.log(res.affectedRows + ' New Employee Added!\n')); 
        });
    }); 
};
updateEmployeeRole = (newData) =>
{    
    console.log(newData);
    const sql = `UPDATE employees SET employees.role_id = ? WHERE employees.first_name = Curt ;`;
    const params = [newData.roleID];
    return new Promise(function(resolve, reject)
    {
        const query = connection.query(sql,params,
        function(err, res) {
        if (err) reject(err);
        resolve(res); 
        });
    }); 
};

module.exports = {getEmployeeChoices,
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
    updateEmployeeRole};
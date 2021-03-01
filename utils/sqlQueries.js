const { promptUser } = require('../utils/inqPrompts.js');
var connection = require('../db/database');

getEmployeeChoices = () =>
{    
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
            resolve(namesList);
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
    let employeeList = master.employeeList; 
    let departmentList = master.departmentList; 
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

module.exports = {getEmployeeChoices,getDepartmentChoices,getRoleChoices,getAllDepartments,getAllRoles,getAllEmployees};
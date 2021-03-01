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

module.exports = {getEmployeeChoices,getDepartmentChoices,getRoleChoices};
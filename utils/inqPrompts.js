const inquirer = require('inquirer');

const promptQuestions = [
"View All Departments",
"View All roles",
"View All Employees",
"View Employee by Manager",
"View Employee by department",
"View total utilized butched by department",
"Add a Department",
"Add a role",
"Add an Employee",
"Update an Employee's Role",
"Update an Employee's Manager",
"Delete a Department",
"Delete a Role",
"Delete an Employee",
]

const promptUser = (employeeList,departmentList,roleList) => {
    
    return inquirer.prompt([
        
        {
            type: 'list',
            name: 'mainChoice',
            message: 'What would you like to do:',
            choices: promptQuestions
        },
        {
            type: 'list',
            name: 'emloyeeChoice',
            message: 'For which employee:',
            choices: employeeList,
            when: ({ mainChoice }) => (mainChoice === "Update an Employee's Role")
        },
        {
            type: 'list',
            name: 'managerChoice',
            message: 'To what manager:',
            choices: employeeList,
            when: ({ mainChoice }) => (mainChoice === "Update an Employee's Manager")
        },
        {
            type: 'list',
            name: 'roleChoice',
            message: 'To what role:',
            choices: roleList,
            when: ({ mainChoice }) => (mainChoice === "Update an Employee's Role")
        }

    ])
};

module.exports = { promptUser };
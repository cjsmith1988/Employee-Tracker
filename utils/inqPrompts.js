const inquirer = require('inquirer');

const promptQuestions = [
"View All Departments",
"View All roles",
"View All Employees",
"View Employee by Manager",
"View Employee by department",
"View total utilized budget by department",
"Add a Department",
"Add a Role",
"Add an Employee",
"Update an Employee's Role",
"Update an Employee's Manager",
"Delete a Department",
"Delete a Role",
"Delete an Employee",
"QUIT"
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
            name: 'employeeChoice',
            message: 'For which employee:',
            choices: employeeList,
            when: ({ mainChoice }) => {
                if (mainChoice === "Update an Employee's Role"){
                    return true;
                } else if (mainChoice === "Update an Employee's Manager"){
                    return true;
                } else if (mainChoice === "Delete an Employee"){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addDepartment',
            message: `What is the Department's name?`,
            when: ({ mainChoice }) => {
                if (mainChoice === "Add a Department"){
                    return true;
                }
            },
            validate: addDepartmentInput => {
                if (addDepartmentInput) {
                    return true;
                } else {
                    console.log('*--Please enter a Department name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addRoleTitle',
            message: `What is the title of the role?`,
            when: ({ mainChoice }) => {
                if (mainChoice === "Add a Role"){
                    return true;
                }
            },
            validate: addRoleTitleInput => {
                if (addRoleTitleInput) {
                    return true;
                } else {
                    console.log('*--Please enter Role Title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addRoleSalary',
            message: `What is the salary of the role?`,
            when: ({ mainChoice }) => {
                if (mainChoice === "Add a Role"){
                    return true;
                }
            },
            validate: addRoleSalaryInput => {
                if (addRoleSalaryInput) {
                    return true;
                } else {
                    console.log("*--Please enter role's Salary!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'departmentChoice',
            message: 'Which department:',
            choices: departmentList,
            when: ({ mainChoice }) => {
                if (mainChoice === "Delete a Department"){
                    return true;
                } else if (mainChoice === "Add a Role"){
                    return true;  
                }
            }
        },
        {
            type: 'input',
            name: 'addFirstName',
            message: `What is the Employee's First Name?`,
            when: ({ mainChoice }) => {
                if (mainChoice === "Add an Employee"){
                    return true;
                } else {
                    return false;
                }
            },               
            validate: addFirstNameInput => {
                if (addFirstNameInput) {
                    return true;
                } else {
                    console.log('*--Please enter a First Name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addLastName',
            message: `What is the Employee's Last Name?`,
            when: ({ mainChoice }) => {
                if (mainChoice === "Add an Employee"){
                    return true;
                }
            },
            validate: addLastNameInput => {
                if (addLastNameInput) {
                    return true;
                } else {
                    console.log('*--Please enter a Last Name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleChoice',
            message: 'To what role:',
            choices: roleList,
            when: ({ mainChoice }) => {
                if (mainChoice === "Update an Employee's Role"){
                    return true;
                } else if (mainChoice === "Delete a Role"){
                    return true; 
                } else if (mainChoice === "Add an Employee"){
                    return true;   
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'managerChoice',
            message: 'To what manager:',
            choices: employeeList,
            when: ({ mainChoice }) => {
                if (mainChoice === "Update an Employee's Manager"){
                    return true;
                } else if (mainChoice === 'Add an Employee'){
                    return true;
                }
            }
        },
        
    ])
};

module.exports = { promptUser };
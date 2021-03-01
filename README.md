# Employee-Tracker
[![License: MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
 
**Project name**: Employee Tracker Challenge

**Description**: This project purpose was to test skills learned with mySQL database and further node.js & inquirer.

**Special Notes**: this project is command line applicatoin. the modules used are: Inquirer, mysql2, and console.table.

**Installation**: 	

access Github repository here: https://github.com/cjsmith1988/Employee-Tracker

🎥 Part 1: https://youtube.com/embed/vZ-Xmi5_w3

🎥 Part 2: https://youtube.com/embed/137DPd69Ab


To download this application localy follow these steps:

- Clone repository

- Open command line with node.js installed and you are located in the cloned directory.

- In the command line type "npm i"

- Open a command line in the location of the cloned directory and type "mysql -u root -h localhost -p" and "source ./db/schema.sql" and "source ./db/seeds.sql"

- this will install the mySQL database

- Back in the GItBash console type "node index" to start the application

**Usage**: This was used for testing node.js and mySQL methods.

**Contributing**: open for contribution, keep in seperate branch

**Credits**: This page was made by Curtis Smith

**License**: MIT License

### User Story:

AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company

SO THAT I can organize and plan my business

### Requirements:

GIVEN a command-line application that accepts user input

WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

![index.js view](https://github.com/cjsmith1988/Employee-Tracker/blob/main/images/gitBashScreenGrab.PNG?raw=true)


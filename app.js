const inquirer = require('inquirer');

function promptUser() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee']
        }
    ]).then(response => {
        if (response.menu === 'View all departments') {
            console.log('you chose to view all depts...');
        }
        if (response.menu === 'View all roles') {
            console.log('you chose to view all Roles...');
        }
        if (response.menu === 'View all employees') {
            console.log('you chose to view all employees...');
        }
        if (response.menu === 'Add a department') {
            console.log('you chose to add a dept...');
        }
        if (response.menu === 'Add a role') {
            console.log('you chose to add a Role...');
        }
        if (response.menu === 'Add an employee') {
            console.log('you chose to Add an employee...');
        } else {
            promptUser();
        }
    })
};

promptUser();
// view all departments,
//view all roles, 
//view all employees, 
//add a department, 
//add a role, 
//add an employee, 
//and update an employee role
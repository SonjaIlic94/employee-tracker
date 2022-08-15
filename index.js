const inquirer = require('inquirer');
const db = require('./db/connection');

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
            viewDept();
        }
        if (response.menu === 'View all roles') {
            console.log('you chose to view all Roles...');
            viewRoles();
        }
        if (response.menu === 'View all employees') {
            console.log('you chose to view all employees...');
            viewEmp();
        }
        if (response.menu === 'Add a department') {
            addDept();
            console.log('you chose to add a dept...');
        }
        if (response.menu === 'Add a role') {
            console.log('you chose to add a Role...');
        }
        if (response.menu === 'Add an employee') {
            console.log('you chose to Add an employee...');
        }
    })
};

promptUser();

//view all departments,
function viewDept() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        console.table(rows)
    });
};

//view all roles,
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        console.table(rows)
    });
};

//view all employees
function viewEmp() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        console.table(rows)
    });
};

// add a department,
function addDept() {

    const sql = `INSERT INTO departments (name) 
             VALUES (?)`;
    const params = [];
    // inquirer.prompt([
    //     {
    //         type: "input",
    //         name: "addDeptName",
    //         message: "What is the name of the new department?"
    //     }
    // ]).then(response => {
    //     console.log('hi');
    // })

};

//add a role,
//add an employee, 
//and update an employee role
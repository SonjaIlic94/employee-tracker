const inquirer = require('inquirer');
const db = require('./db/connection');

// db.connect({
//     function() {
//         promptUser()
//     }
// });

function promptUser() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Quit']
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
            addRole();
        }
        if (response.menu === 'Add an employee') {
            console.log('you chose to Add an employee...');
        }
        if (response.menu === 'Quit') {
            console.log('Logging out!');
            db.end();
        }
    })
};

//view all departments,
function viewDept() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        console.table(rows)
        promptUser();
    });
};

//view all roles,
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        console.table(rows)
        promptUser();
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
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        }
    ]).then(response => {
        const sql = `INSERT INTO departments(name) VALUES (?)`;
        const params = [response.deptName];
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log('You have added a department called ' + response.deptName);
            promptUser();
        })
    });
};


//add a role
function addRole() {
    db.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the title of the new role?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the new role?"
            },
            {
                type: "list",
                name: "deptId",
                message: "Choose a department for this role.",
                choices: res.map(item => item.name)
            }
        ]).then(response => {
            console.log(response);
            const sql = `INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`;
            const chosenDept = res.find(dept => dept.name === response.deptId);
            console.log(chosenDept);
            const params = [response.roleTitle, response.roleSalary, chosenDept.id];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })
            console.log("New role added");
            promptUser();
        })
    })
};

// Add an employee


promptUser();

//add an employee, 
//inside emp do db.query roles table
//and update an employee role
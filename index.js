const inquirer = require('inquirer');
const db = require('./db/connection');

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
            viewDept();
        }
        if (response.menu === 'View all roles') {
            viewRoles();
        }
        if (response.menu === 'View all employees') {
            viewEmp();
        }
        if (response.menu === 'Add a department') {
            addDept();
        }
        if (response.menu === 'Add a role') {
            addRole();
        }
        if (response.menu === 'Add an employee') {
            addEmp();
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
        promptUser();
    });
};

// Add a department,
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

// Add a role
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
function addEmp() {
    db.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "empFirstName",
                message: "What is the first name of the new employee?"
            },
            {
                type: "input",
                name: "empLastName",
                message: "What is the last name of the new employee?"
            },
            {
                type: "list",
                name: "roleId",
                message: "Choose a role for this employee.",
                choices: res.map(item => item.title)
            },
            {
                type: "list",
                name: "managerId",
                message: "Who is the employees manager?.",
                choices: res.map(item => item.id)
            }

        ]).then(response => {
            console.log(res.map(item => item.role_id));
            console.log('hello');
            console.log(response);
            const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const chosenRole = res.find(roles => roles.title === response.roleId);
            const chosenManager = res.find(roles => roles.id === response.managerId);
            console.log(chosenRole);
            const params = [response.empFirstName, response.empLastName, chosenRole.id, chosenManager.id];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })
            console.log("New employee added");
            promptUser();
        })
    })
};

promptUser();
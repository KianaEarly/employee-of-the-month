const mysql = require('mysql2')
const inquirer = require('inquirer')
require('dotenv').config()
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: process.env.password,
        database: 'employees_db'
    },
);

menu()
function menu() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    })
        .then(answer => {
            if (answer.menu == "View Departments") {
                viewDepartments()
            }
            if (answer.menu == "View Roles") {
                viewRoles()
            }
            if (answer.menu == "View Employees") {
                viewEmployees()
            }
            if (answer.menu == "Add Department") {
                addDepartment()
            }
            if (answer.menu == "Add Role") {
                addRole()
            }
            if (answer.menu == "Add Employee") {
                addEmployee()
            }
            if (answer.menu == "Update Employee Role") {
                updateEmployeeRole()
            }
        })
    }
    function viewDepartments() {
        db.query("select * from department", (err, res) => {
            if(err) throw err 
            console.table(res) 
            menu()
        })
    }

    function viewRoles() {
        db.query("select * from role", (err, res) => {
            if(err) throw err 
            console.table(res)
            menu()
        })
    }

    function viewEmployees() {
        db.query("select * from employee", (err, res) => {
            if(err) throw err 
            console.table(res)
            menu()
        })
    }

    function addDepartment() {
        inquirer.prompt({
            message: "What is the name of the new department?",
            name: "name",
        })
        .then(answer => {
            db.query(`insert into department(name) values("${answer.name}")`, (err, res) => {
                if(err) throw err 
                console.table(res)
                menu()
            })
        })
    }

    function addRole() {
        inquirer.prompt([{
            message: "What is the title of the role would you like to add?",
            name: "title",
        },
        {
            message: "What is the salary for this position?",
            name: "salary",
        },
        {
            message: "What is the department_id for this position?",
            name: "department_id",
        },
    ])
        .then(answer => {
            db.query(`insert into role(title, salary, department_id) values("${answer.title}", ${answer.salary}, ${answer.department_id})`, (err, res) => {
                if(err) throw err 
                console.table(res)
                menu()
            })
        })
    }

    function addEmployee() {
        inquirer.prompt([{
            message: "What is the first name of the role would you like to add?",
            name: "first_name",
        },
        {
            message: "What is the last name for this position?",
            name: "last_name",
        },
        {
            message: "What is the role_id for this position?",
            name: "role_id",
        },
        {
            message: "What is the manager_id for this position?",
            name: "manager_id",
        },
    ])
        .then(answer => {
            db.query(`insert into employee(first_name, last_name, role_id, manager_id) values("${answer.first_name}", "${answer.last_name}", ${answer.role_id}, ${answer.manager_id})`, (err, res) => {
                if(err) throw err 
                console.table(res)
                menu()
            })
        })
    }

    function updateEmployeeRole() {
        inquirer.prompt([{
            message: "What is the id of the employee you would like to update?",
            name: "employee_id",
        },
        {
            message: "What is the id of the new role?",
            name: "role_id",
        },
    ])
        .then(answer => {
            db.query(`update employee set role_id = ${answer.role_id} where id = ${answer.employee_id}`, (err, res) => {
                if(err) throw err 
                console.table(res)
                menu()
            })
        })
    }

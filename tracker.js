const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '',
    database: 'employee_trackerDB',
});

connection.connect((err) =>{
    if (err) throw err;
    addCompanyDetails();
})

const addCompanyDetails = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add a department?',
            'Add employee roles?',
            'Add employees?',
        ],
    })
    .then((answer) => {
        switch(answer.action) {
            case 'Add a department?':
                addDepartments();
                break;
                
            case 'Add employee roles?':
                addRoles();
                break;
            
            case 'Add employees?':
                addEmployees();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};


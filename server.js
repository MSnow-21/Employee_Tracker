const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

//testing console.table entries

console.table([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: process.env.DB_PASS,
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
        type: 'list',
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

const addDepartments = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'departmentname',
        message: 'what is the name of the department?',

    })
    .then((answer) => {
        console.log("Inserting a new department....\n");
        const query = connection.query(
            'INSERT INTO department SET name=?',
            [answer.departmentname],
            console.table([answer.departmentname]),
            (err,res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department updated!\n`);
                connection.end();
            }
        );

    });
    

}
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

//testing console.table entries

// console.table([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);

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
            'Add employee role?',
            'Add employee?',
            'View employees?',
            'View roles?',
            'View departments?',
            'Update employee role',
            'End',
        ],
    })
    .then((answer) => {
        switch(answer.action) {
            case 'Add a department?':
                addDepartments();
                break;
                
            case 'Add employee role?':
                addRoles();
                break;
            
            case 'Add employee?':
                addEmployees();
                break;

            case 'View employees?':
                viewEmployees();
                break;

            case 'View roles?':
                viewRoles();
                break;

            case 'View departments?':
                viewDepartments();
                break;
            case 'Update employee role':
                updateRole();

            case 'End':
                endConnection();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};

const addDepartments = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentname',
            message: 'what is the name of the department?',
        }])
        .then((answer) => {
            console.log("Inserting a new department....\n");
            const query = connection.query(
                'INSERT INTO department SET name=?',
                [answer.departmentname],
                console.table([answer.departmentname]),
                (err,res) => {
                    if (err) throw err;
                    console.log("Department updated");
                    connection.end();
                }
            );
        });
}

const addRoles = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What employee role would you like to add to your company?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the employee title entered?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id for this employee role?',
        }])
        .then((answer) => {
            console.log('Inserting in employee roles into database.....\n');
            const query = connection.query(
                'INSERT INTO role SET ?',
                [
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id,
                    }
                ],
                console.table([answer.title,answer.salary,answer.department_id]),
                (err,res) => {
                    if (err) throw err;
                    addCompanyDetails(); // or connection.end();
                }

            )
        })
};

const addEmployees = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employees manager id?',
        },
    ])
    .then((answer) => {
        console.log('Inserting employee names and manager ids into database....\n');
        const query = connection.query(
            'INSERT INTO employee SET ?',
            [
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                }
            ],
            console.table([answer.first_name,answer.last_name,answer.manager_id]),
            (err,res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department updated!\n`);
                addCompanyDetails(); // or connection.end();
            }
        )
    })
};

const updateRole = () => {
    
}


const viewEmployees = () => {
    connection.query('SELECT * From employee', (err,res)=>{
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

const viewRoles = () => {
    connection.query('Select * From role', (err,res)=>{
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

const viewDepartments = () => {
    connection.query('Select * From department', (err,res)=>{
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}


const endConnection = () => {
    connection.end();
}

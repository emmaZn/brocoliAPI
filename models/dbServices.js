const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: 'brocoli.cbyjxhnltwdv.eu-west-3.rds.amazonaws.com',
    user: 'admin',
    password: 'adminbrocoli',
    database: 'brocoli',
    port: '3306',

})

connection.connect((error) => {
    if (error) {
        console.log(error.message)
    }
    console.log('db ' + connection.state)
})

module.exports = connection;
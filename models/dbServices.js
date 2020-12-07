const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'admin',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    insecureAuth: true,

})

connection.connect((error) => {
    if (error) {
        console.log(error.message)
    }
    console.log('db ' + connection.state)
})

module.exports = connection;
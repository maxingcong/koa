const mysql = require('mysql')
const { database } = require('../config')


export default mysql.createPool({
    host: database.host,
    port: database.port,
    user: database.user,
    password: database.password,
    database: database.database
})



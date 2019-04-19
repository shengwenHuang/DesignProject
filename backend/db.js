// connection pool
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    // host: "localhost",
    host: "http://poac.uksouth.cloudapp.azure.com",
    user: "root",
    port: 8889,
    password: "root",
    database: "survey",    
 
})

module.exports =  function getConnection() {
    return pool;
}

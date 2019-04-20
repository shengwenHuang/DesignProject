// connection pool
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    // user: "Team-9-POAC", SWITCH ME FOR ROOT
    user: "root",
    port: 8889,
    password: "root",
    database: "survey",    
 
})

module.exports =  function getConnection() {
    return pool;
}

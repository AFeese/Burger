
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AshleyFeeseSql",
    database: "burgers_db"
});

//Making connection:
connection.connect(function(err) {
    if (err) {
        console.error("error connection: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Exporting connection for ORM usage:
module.exports = connection;

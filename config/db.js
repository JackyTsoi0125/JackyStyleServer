const mysql = require("mysql");
// connect MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port : 3306,
    user: "root",
    password: "password",
    database: "jackstyle",
    dialect: "MySql"
    
});


/*

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "jackstyle",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/

module.exports  = connection;

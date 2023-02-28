const mysql = require("mysql");

//MySql connection details
const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "powerUsageDb",
});

//establishing connection
connection.connect((err) => {
  if (!err) {
    console.log("connection established.");
  } else {
    console.log(err);
  }
});

module.exports = connection;

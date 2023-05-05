require('dotenv').config({ path: './.env' });
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "db",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = pool.promise();

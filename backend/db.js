// require('dotenv').config({ path: './.env' });
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "db",
  user: "user",
  password: "password",
  database: "database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getHistory() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM history");
  connection.release();
  return rows;
}

async function addHistory(place, lat, lng, radius) {
  const connection = await pool.getConnection();
  const [result] = await connection.execute(
    "INSERT INTO history (place, lat, lng, radius) VALUES (?, ?, ?, ?)",
    [place, lat, lng, radius]
  );
  connection.release();
  return result.insertId;
}

async function deleteAllHistory() {
  const connection = await pool.getConnection();
  const [result] = await connection.execute("DELETE FROM history");
  connection.release();
  return result.affectedRows;
}

module.exports = { getHistory, addHistory, deleteAllHistory };

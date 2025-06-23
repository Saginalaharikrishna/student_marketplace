// config/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'student_marketplace'
});

module.exports = db;

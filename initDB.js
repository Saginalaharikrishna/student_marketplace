const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

// 1. Read schema.sql
const schema = fs.readFileSync('./schema.sql', 'utf-8');

// 2. Connect to Railway DB
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// 3. Run SQL
connection.connect(err => {
  if (err) {
    console.error('❌ Connection error:', err);
    return;
  }
  console.log('✅ Connected to Railway MySQL');

  connection.query(schema, (err, results) => {
    if (err) {
      console.error('❌ Error running schema.sql:', err.message);
    } else {
      console.log('✅ Database initialized successfully');
    }
    connection.end();
  });
});

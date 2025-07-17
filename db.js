// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // 🔁 Replace with your MySQL user
  password: 'balaji',        // 🔁 Replace with your MySQL password
  database: 'cake_shop'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ MySQL Connected (via db.js)');
  }
});

module.exports = db;

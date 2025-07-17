// File: server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// ✅ MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // 🔁 Change if your MySQL user is different
  password: 'balaji',         // 🔁 Add password if set
  database: 'cake_shop' // ✅ Make sure this DB exists
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ MySQL Connected');
  }
});

// ✅ Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/order', (req, res) => {
  res.render('order', { cake: req.query.cake || '' });
});

app.post('/order', (req, res) => {
  const { name, phone, address, cake } = req.body;
  const sql = 'INSERT INTO orders (name, phone, address, cake) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, phone, address, cake], (err) => {
    if (err) {
      console.error('❌ Order insert error:', err);
      res.status(500).send('Something went wrong while placing your order.');
    } else {
      res.send('🎉 Order placed successfully!');
    }
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error('❌ Contact insert error:', err);
      res.status(500).send('Something went wrong while sending your message.');
    } else {
      res.send('📩 Message sent successfully!');
    }
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

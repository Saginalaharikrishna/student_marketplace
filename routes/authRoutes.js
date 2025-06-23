// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // your DB connection
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, phone, password, confirmPassword, branch, year, college } = req.body;

  if (!name || !email || !phone || !password || !branch || !year) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users (name, email, phone, password, branch, year, college)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [name, email, phone, hashedPassword, branch, year, college]);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Register Error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});





//-------------------------------------------------- Login route----------------------------------------------------------

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

     res.status(200).json({ message: 'Login successful', id: user.id, name: user.name });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});





module.exports = router;

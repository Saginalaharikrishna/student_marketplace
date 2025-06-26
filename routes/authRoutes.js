const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const sendMail = require('../utils/nodemailer'); // You'll create this

//-------------------------------------------------- Register route ----------------------------------------------------------
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


//-------------------------------------------------- Login route ----------------------------------------------------------

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


//-------------------------------------------------- Send OTP route ----------------------------------------------------------
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.json({ success: false, message: "Email not registered." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.execute('INSERT INTO otp_verification (email, otp) VALUES (?, ?)', [email, otp]);

    await sendMail(email, otp); // sends email using nodemailer
    res.json({ success: true, message: "OTP sent to your email." });

  } catch (err) {
    console.error('Send OTP Error:', err);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});


//-------------------------------------------------- Verify OTP route ----------------------------------------------------------
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [rows] = await db.execute(`
      SELECT * FROM otp_verification
      WHERE email = ? AND otp = ? AND created_at >= NOW() - INTERVAL 10 MINUTE
    `, [email, otp]);

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid or expired OTP." });
    }

    res.json({ success: true, message: "OTP verified successfully." });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({ success: false, message: "Error verifying OTP." });
  }
});


//-------------------------------------------------- Update Password route ----------------------------------------------------------
router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.execute('UPDATE users SET password = ? WHERE email = ?', [hashed, email]);
    await db.execute('DELETE FROM otp_verification WHERE email = ?', [email]);

    res.json({ success: true, message: "Password updated successfully." });

  } catch (err) {
    console.error('Update Password Error:', err);
    res.status(500).json({ success: false, message: "Error updating password." });
  }
});

module.exports = router;

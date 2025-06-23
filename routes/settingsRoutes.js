// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage configuration for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/profiles';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = 'profile-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// GET /api/settings/profile/:id
router.get('/profile/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, phone, branch, year, college, profile_pic FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/settings/profile/update
router.post('/profile/update', upload.single('profile_pic'), async (req, res) => {
  try {
    const { id, name, phone, branch, year, college } = req.body;
    let profile_pic_path = null;

    if (req.file) {
      profile_pic_path = `/uploads/profiles/${req.file.filename}`;
    }

    let query = `UPDATE users SET name = ?, phone = ?, branch = ?, year = ?, college = ?`;
    const values = [name, phone, branch, year, college];

    if (profile_pic_path) {
      query += `, profile_pic = ?`;
      values.push(profile_pic_path);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    await db.query(query, values);

    res.json({ success: true, message: "Profile updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});



router.get('/profile/:id', async (req, res) => {
  const [rows] = await db.query('SELECT name, profile_pic FROM users WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "User not found" });
  res.json(rows[0]);
});


module.exports = router;

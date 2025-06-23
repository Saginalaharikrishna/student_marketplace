const express = require('express');
const router = express.Router();
const db = require('../config/db');
// Get user (seller) by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.query('SELECT id, name, year FROM users WHERE id = ?', [id]);
    if (!user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (err) {
    console.error("Failed to fetch user:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

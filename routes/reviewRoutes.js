const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1) Add a review after buyed
router.post('/', async (req, res) => {
  const { request_id, item_id, seller_id, buyer_id, rating, comment } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO reviews 
         (request_id, item_id, seller_id, buyer_id, rating, comment) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [request_id, item_id, seller_id, buyer_id, rating, comment]
    );
    res.json({ message: 'Review saved', reviewId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// 2) Fetch reviews for a given seller (for item_requested.html)
router.get('/seller/:sellerId', async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const [rows] = await db.query(`
      SELECT r.rating, r.comment, r.created_at,
             u.name AS buyer_name, u.branch, u.year 
      FROM reviews r 
      JOIN users u ON r.buyer_id = u.id
      WHERE r.seller_id = ?
      ORDER BY r.created_at DESC
    `, [sellerId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;

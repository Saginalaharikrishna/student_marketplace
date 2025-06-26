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




router.get('/average/:sellerId', async (req, res) => {
  const { sellerId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT AVG(rating) AS avgRating, COUNT(*) AS totalReviews
       FROM reviews WHERE seller_id = ?`,
      [sellerId]
    );

    const avg = rows[0].avgRating;
    const count = rows[0].totalReviews;

    res.json({
      average: avg ? Number(avg).toFixed(2) : 0,
      totalReviews: count || 0
    });
  } catch (err) {
    console.error('Error fetching average rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

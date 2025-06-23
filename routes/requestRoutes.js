const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. Create Request
router.post('/', async (req, res) => {
  const { item_id, buyer_id, seller_id } = req.body;

  console.log("📥 Received request:", req.body);

  if (!item_id || !buyer_id || !seller_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO requests (item_id, buyer_id, seller_id) VALUES (?, ?, ?)',
      [item_id, buyer_id, seller_id]
    );

    console.log("✅ Request inserted:", result.insertId);
    res.json({ message: 'Request created', requestId: result.insertId });

  } catch (err) {
    console.error("❌ DB Insert Error:", err);
    res.status(500).json({ error: "Database error", details: err });
  }
});

router.get('/buyer/:buyerId', async (req, res) => {
  const buyerId = req.params.buyerId;
  try {
    const [requests] = await db.query(`
      SELECT
        r.id                AS request_id,
        r.status,
        i.id                AS item_id,
        i.name              AS item_name,
        i.price,
        i.branch,
        i.year,
        r.seller_id,                         -- add this
        u.name              AS seller_name,
        u.phone             AS seller_phone,
        (SELECT image_path
           FROM item_images
           WHERE item_id = i.id
           LIMIT 1
        )                    AS image
      FROM requests r
      JOIN items    i ON r.item_id   = i.id
      JOIN users    u ON r.seller_id = u.id
      WHERE r.buyer_id = ?
    `, [buyerId]);

    res.json(requests);
  } catch (err) {
    console.error("Error fetching buyer requests:", err);
    res.status(500).json({ error: "Database error" });
  }
});





// 3. Get requests by seller (my_item_requested.html)
router.get('/seller/:sellerId', async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const [requests] = await db.query(`
      SELECT 
        r.id AS request_id,
        r.status,
        i.id AS item_id,
        i.name AS item_name,
        i.price,
        u.name AS buyer_name,
        u.phone AS buyer_phone,
        (SELECT image_path FROM item_images WHERE item_id = i.id LIMIT 1) AS image
      FROM requests r
      JOIN items i ON r.item_id = i.id
      JOIN users u ON r.buyer_id = u.id
      WHERE r.seller_id = ?
    `, [sellerId]);

    res.json(requests);
  } catch (err) {
    console.error("Error fetching seller requests:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// 4. Update status (Accept, Buyed, etc.)
router.put('/:requestId/status', async (req, res) => {
  const requestId = req.params.requestId;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: "Missing status field" });

  try {
    await db.query(
      'UPDATE requests SET status = ? WHERE id = ?',
      [status, requestId]
    );

    res.json({ message: 'Status updated' });

  } catch (err) {
    console.error("❌ Error updating request status:", err);
    res.status(500).json({ error: err });
  }
});

// 5. Cancel/Delete a request
router.delete('/:requestId', async (req, res) => {
  const requestId = req.params.requestId;

  try {
    await db.query(
      'DELETE FROM requests WHERE id = ?',
      [requestId]
    );

    res.json({ message: 'Request deleted' });

  } catch (err) {
    console.error("❌ Error deleting request:", err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;

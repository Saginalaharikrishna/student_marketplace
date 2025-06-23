const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Set up storage

const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/items');
    
    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage })

// POST /api/items/list
router.post('/list', upload.array('images', 6), async (req, res) => {
  const {
    itemName,
    category,
    branch,
    year,
    type,
    mode,
    description,
    price
  } = req.body;

  const user_id = req.body.user_id; // You can get this from session or localStorage via client

  if (!user_id) return res.status(400).json({ message: "Missing user ID" });

  try {
    const [result] = await db.execute(
      `INSERT INTO items 
      (user_id, name, description, category, branch, year, price, type, mode) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, itemName, description, category, branch, year, price || 0, type, mode]
    );

    const itemId = result.insertId;

    // Save each image
    for (const file of req.files) {
     await db.execute(
       `INSERT INTO item_images (item_id, image_path) VALUES (?, ?)`,
      [itemId, `/uploads/items/${file.filename}`] // ✅ Store relative path
      );
    }

    res.status(201).json({ message: 'Item listed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});






// --------------------------displaying the listed items ------------------------------------
// FIXED ✅ — return all items of the user (both Available & Sold)
router.get('/user/:id', async (req, res) => {
  try {
    const [items] = await db.execute(
      'SELECT * FROM items WHERE user_id = ?',
      [req.params.id]
    );
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user items" });
  }
});








// -------------------------------images loading ---------------------------
router.get('/:id/images', async (req, res) => {
  try {
    const [images] = await db.execute(
      'SELECT image_path FROM item_images WHERE item_id = ?',
      [req.params.id]
    );
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch images' });
  }
});





// -----------------------------------------------PATCH /api/items/:id/sold------------------------
router.patch('/:id/sold', async (req, res) => {
  const itemId = req.params.id;
  try {
    await db.execute(
      'UPDATE items SET status = ? WHERE id = ?',
      ['Sold', itemId]
    );
    res.status(200).json({ message: 'Item marked as sold.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status.' });
  }
});

//----------------------------------------------- all items ------------------------------------------------------------

router.get('/available', async (req, res) => {
  const { keyword, branch, category, type, mode } = req.query;

  let query = 'SELECT * FROM items WHERE status = "Available"';
  const params = [];

  if (keyword) {
    query += ' AND name LIKE ?';
    params.push(`%${keyword}%`);
  }
  if (branch) {
    query += ' AND branch = ?';
    params.push(branch);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }
  if (mode) {
    query += ' AND mode = ?';
    params.push(mode);
  }

  try {
    const [items] = await db.execute(query, params);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch available items' });
  }
});

//-----------------------------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [item] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
    if (!item || item.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item[0]);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});






module.exports = router;

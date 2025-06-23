const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register backend routes BEFORE 404 handler
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// adding new item route
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


const requestRoutes = require('./routes/requestRoutes');
app.use('/api/requests', requestRoutes);


const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);


const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);



// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ❌ Now this catches unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;

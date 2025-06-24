const app = require('./app');
const dotenv = require('dotenv');
const setupDatabase = require('./initDB');

// Load environment variables
dotenv.config();

// 🧠 Run DB setup only once for fresh Railway DB
setupDatabase(); // ⛔ Remove or comment this after successful run

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const queries = `
-- (Paste only CREATE + INSERT SQL below here. Skip all /*!401xx and LOCK TABLES...)

DROP TABLE IF EXISTS item_images;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  branch VARCHAR(50) DEFAULT NULL,
  year INT DEFAULT NULL,
  college VARCHAR(100) DEFAULT NULL,
  profile_pic VARCHAR(255) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
);

INSERT INTO users VALUES
(1,'Hari krishna','harikrishna@jntua.ac.in','6304069520','$2b$10$2BDwM1mKIYv07b7nTglT5eheC/otYex1ns4JvgkmwT7BSV0D4KZ7C','Cse',1,'JNTUA','/uploads/profiles/profile-1750678153366.png','2025-06-22 08:53:07'),
(2,'rohit','rohit@jntua.ac.in','6304069521','$2b$10$TG0opVewAVvuKXXIJjE9reg3iQWVLrrLsMrMlR2dRSsEAx8nsLtXS','cse',1,'JNTUA',NULL,'2025-06-22 08:58:40'),
(3,'rahul','rahul@gamil.com','6985243170','$2b$10$IhQ.TAMY.WBJo3PZr0oUw.e77MXm7U2/EHio/f7YZL/ZuBobFykNu','civil',3,'JNTUA',NULL,'2025-06-23 15:00:57');

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  branch VARCHAR(50),
  year INT,
  price DECIMAL(10,2),
  type ENUM('Single','Combo') DEFAULT 'Single',
  mode ENUM('Donation','Discounted') DEFAULT 'Discounted',
  status ENUM('Available','Sold') DEFAULT 'Available',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO items VALUES
(1,1,'mathsbook','discerete maths book','book','cse',1,0.00,'Single','Donation','Sold','2025-06-22 10:43:53'),
(2,1,'social book','social book OE','book','cse',4,0.00,'Single','Donation','Sold','2025-06-22 11:08:50'),
(3,2,'casio','casio with good funtional buttons and display','calculator','mech',2,200.00,'Single','Discounted','Available','2025-06-22 11:17:58'),
(4,1,'coat','mech lab coat ','lab uniform','mech',1,100.00,'Single','Discounted','Sold','2025-06-22 12:14:48'),
(5,1,'c ','the famous language book','programming','cse',2,0.00,'Single','Donation','Available','2025-06-22 14:49:05'),
(6,1,'placement book','it is a wonderfull book for placement preparation. Grab the opportunity  it is free of cost','book','cse',4,0.00,'Single','Donation','Available','2025-06-23 13:17:54'),
(7,2,'python','ewy 3vl89iy','book','mech',2,200.00,'Single','Discounted','Sold','2025-06-23 13:33:06');

CREATE TABLE item_images (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

INSERT INTO item_images VALUES
(1,1,'/uploads/items/img1.png'), (2,1,'/uploads/items/img2.png'); -- (simplified paths)

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT,
  buyer_id INT,
  seller_id INT,
  status ENUM('pending','accepted','cancelled','completed') DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (seller_id) REFERENCES users(id)
);

INSERT INTO requests VALUES
(41,3,1,2,'accepted','2025-06-23 04:55:38');

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  request_id INT NOT NULL,
  item_id INT NOT NULL,
  seller_id INT NOT NULL,
  buyer_id INT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (request_id) REFERENCES requests(id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO reviews VALUES
(1,42,5,1,2,5,'Good!','2025-06-23 07:13:19');
`;

    await connection.query(queries);
    console.log("✅ Database setup complete.");
  } catch (err) {
    console.error("❌ Error running setup script:", err);
  } finally {
    connection.end();
  }
}

module.exports = setupDatabase;

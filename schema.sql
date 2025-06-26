DROP TABLE IF EXISTS item_images;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10),
  password VARCHAR(255) NOT NULL,
  branch VARCHAR(50),
  year INT,
  college VARCHAR(100),
  profile_pic VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
);

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  branch VARCHAR(50),
  year INT,
  price DECIMAL(10,2),
  type ENUM('Single', 'Combo') DEFAULT 'Single',
  mode ENUM('Donation', 'Discounted') DEFAULT 'Discounted',
  status ENUM('Available', 'Sold') DEFAULT 'Available',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE item_images (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

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

INSERT INTO users VALUES
(1,'Hari krishna','harikrishna@jntua.ac.in','6304069520','$2b$10$2BDwM1mKIYv07b7nTglT5eheC/otYex1ns4JvgkmwT7BSV0D4KZ7C','Cse',1,'JNTUA','/uploads/profiles/profile-1750678153366.png','2025-06-22 08:53:07'),
(2,'rohit','rohit@jntua.ac.in','6304069521','$2b$10$TG0opVewAVvuKXXIJjE9reg3iQWVLrrLsMrMlR2dRSsEAx8nsLtXS','cse',1,'JNTUA',NULL,'2025-06-22 08:58:40'),
(3,'rahul','rahul@gamil.com','6985243170','$2b$10$IhQ.TAMY.WBJo3PZr0oUw.e77MXm7U2/EHio/f7YZL/ZuBobFykNu','civil',3,'JNTUA',NULL,'2025-06-23 15:00:57');

INSERT INTO items VALUES
(1,1,'mathsbook','discerete maths book','book','cse',1,0.00,'Single','Donation','Sold','2025-06-22 10:43:53'),
(2,1,'social book','social book OE','book','cse',4,0.00,'Single','Donation','Sold','2025-06-22 11:08:50'),
(3,2,'casio','casio with good funtional buttons and display','calculator','mech',2,200.00,'Single','Discounted','Available','2025-06-22 11:17:58'),
(4,1,'coat','mech lab coat ','lab uniform','mech',1,100.00,'Single','Discounted','Sold','2025-06-22 12:14:48'),
(5,1,'c ','the famous language book','programming','cse',2,0.00,'Single','Donation','Available','2025-06-22 14:49:05'),
(6,1,'placement book','it is a wonderfull book for placement preparation. Grab the opportunity  it is free of cost','book','cse',4,0.00,'Single','Donation','Available','2025-06-23 13:17:54'),
(7,2,'python','ewy 3vl89iy','book','mech',2,200.00,'Single','Discounted','Sold','2025-06-23 13:33:06');

INSERT INTO item_images VALUES
(1,1,'/uploads/items/1750569233558-Screenshot 2023-09-21 184029.png'),
(2,1,'/uploads/items/1750569233559-Screenshot 2023-10-04 193834.png'),
(3,1,'/uploads/items/1750569233569-Screenshot 2023-10-06 194329.png'),
(4,2,'/uploads/items/1750570730738-architechture.png'),
(5,2,'/uploads/items/1750570730739-driving_licence_application.png'),
(6,2,'/uploads/items/1750570730760-er diragram.png'),
(7,3,'/uploads/items/1750571278189-Screenshot 2025-06-11 103103.png'),
(8,3,'/uploads/items/1750571278206-Screenshot 2025-06-11 103126.png'),
(9,3,'/uploads/items/1750571278210-Screenshot 2025-06-11 103140.png'),
(10,4,'/uploads/items/1750574688460-Screenshot 2023-11-25 120724.png'),
(11,4,'/uploads/items/1750574688484-Screenshot 2023-11-25 120848.png'),
(12,4,'/uploads/items/1750574688505-Screenshot 2024-02-11 164338.png'),
(13,5,'/uploads/items/1750583945377-Screenshot 2023-11-25 120724.png'),
(14,5,'/uploads/items/1750583945388-Screenshot 2023-11-25 120848.png'),
(15,5,'/uploads/items/1750583945405-Screenshot 2024-04-12 211337.png'),
(16,6,'/uploads/items/1750664874827-Screenshot 2025-03-09 104750.png'),
(17,6,'/uploads/items/1750664874830-Screenshot 2025-04-02 214535.png'),
(18,6,'/uploads/items/1750664874845-Screenshot 2025-04-02 215657.png'),
(19,7,'/uploads/items/1750665786372-flowchart.png'),
(20,7,'/uploads/items/1750665786377-Screenshot 2023-11-25 093647.png'),
(21,7,'/uploads/items/1750665786388-Screenshot 2023-11-25 095829.png');

INSERT INTO requests VALUES
(41,3,1,2,'accepted','2025-06-23 04:55:38'),
(42,5,2,1,'accepted','2025-06-23 05:30:26'),
(43,5,1,1,'accepted','2025-06-23 05:50:22'),
(44,3,1,2,'accepted','2025-06-23 07:26:19'),
(46,6,1,1,'completed','2025-06-23 07:52:46'),
(49,7,1,2,'pending','2025-06-23 08:04:47');

INSERT INTO reviews VALUES
(1,42,5,1,2,5,'jhgldtyuyup[o','2025-06-23 07:13:19'),
(2,43,5,1,1,5,';\'lkiuy;tyr8o ','2025-06-23 07:14:21'),
(3,41,3,2,1,5,'hjkj, vcxthfymn','2025-06-23 07:17:36'),
(4,41,3,2,1,5,'dfhgjfhjn','2025-06-23 07:30:12'),
(5,43,5,1,1,5,'gff ','2025-06-23 07:31:59');

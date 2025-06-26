-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: student_marketplace
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_images`
--

DROP TABLE IF EXISTS `item_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_images_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_images`
--

LOCK TABLES `item_images` WRITE;
/*!40000 ALTER TABLE `item_images` DISABLE KEYS */;
INSERT INTO `item_images` VALUES (1,1,'D:\\student-marketplace-backend\\uploads\\items\\1750569233558-Screenshot 2023-09-21 184029.png'),(2,1,'D:\\student-marketplace-backend\\uploads\\items\\1750569233559-Screenshot 2023-10-04 193834.png'),(3,1,'D:\\student-marketplace-backend\\uploads\\items\\1750569233569-Screenshot 2023-10-06 194329.png'),(4,2,'/uploads/items/1750570730738-architechture.png'),(5,2,'/uploads/items/1750570730739-driving_licence_application.png'),(6,2,'/uploads/items/1750570730760-er diragram.png'),(7,3,'/uploads/items/1750571278189-Screenshot 2025-06-11 103103.png'),(8,3,'/uploads/items/1750571278206-Screenshot 2025-06-11 103126.png'),(9,3,'/uploads/items/1750571278210-Screenshot 2025-06-11 103140.png'),(10,4,'/uploads/items/1750574688460-Screenshot 2023-11-25 120724.png'),(11,4,'/uploads/items/1750574688484-Screenshot 2023-11-25 120848.png'),(12,4,'/uploads/items/1750574688505-Screenshot 2024-02-11 164338.png'),(13,5,'/uploads/items/1750583945377-Screenshot 2023-11-25 120724.png'),(14,5,'/uploads/items/1750583945388-Screenshot 2023-11-25 120848.png'),(15,5,'/uploads/items/1750583945405-Screenshot 2024-04-12 211337.png'),(16,6,'/uploads/items/1750664874827-Screenshot 2025-03-09 104750.png'),(17,6,'/uploads/items/1750664874830-Screenshot 2025-04-02 214535.png'),(18,6,'/uploads/items/1750664874845-Screenshot 2025-04-02 215657.png'),(19,7,'/uploads/items/1750665786372-flowchart.png'),(20,7,'/uploads/items/1750665786377-Screenshot 2023-11-25 093647.png'),(21,7,'/uploads/items/1750665786388-Screenshot 2023-11-25 095829.png'),(22,8,'/uploads/items/1750826832832-Pass port size photo.jpg'),(23,8,'/uploads/items/1750826832847-Svgp_id_card.jpg'),(24,8,'/uploads/items/1750826832876-svgp_no_dues_from.jpg');
/*!40000 ALTER TABLE `item_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text,
  `category` varchar(50) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `type` enum('Single','Combo') DEFAULT 'Single',
  `mode` enum('Donation','Discounted') DEFAULT 'Discounted',
  `status` enum('Available','Sold') DEFAULT 'Available',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'mathsbook','discerete maths book','book','cse',1,0.00,'Single','Donation','Sold','2025-06-22 10:43:53'),(2,1,'social book','social book OE','book','cse',4,0.00,'Single','Donation','Sold','2025-06-22 11:08:50'),(3,2,'casio','casio with good funtional buttons and display','calculator','mech',2,200.00,'Single','Discounted','Available','2025-06-22 11:17:58'),(4,1,'coat','mech lab coat ','lab uniform','mech',1,100.00,'Single','Discounted','Sold','2025-06-22 12:14:48'),(5,1,'c ','the famous language book','programming','cse',2,0.00,'Single','Donation','Available','2025-06-22 14:49:05'),(6,1,'placement book','it is a wonderfull book for placement preparation. Grab the opportunity  it is free of cost','book','cse',4,0.00,'Single','Donation','Available','2025-06-23 13:17:54'),(7,2,'python','ewy 3vl89iy','book','mech',2,200.00,'Single','Discounted','Sold','2025-06-23 13:33:06'),(8,3,'drafter ','Drafter used for drawing ','tool','mech',2,100.00,'Single','Discounted','Available','2025-06-25 10:17:12');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_verification`
--

DROP TABLE IF EXISTS `otp_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_verification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_verification`
--

LOCK TABLES `otp_verification` WRITE;
/*!40000 ALTER TABLE `otp_verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `buyer_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `status` enum('pending','accepted','cancelled','completed') DEFAULT 'pending',
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (41,3,1,2,'accepted','2025-06-23 04:55:38'),(42,5,2,1,'accepted','2025-06-23 05:30:26'),(43,5,1,1,'accepted','2025-06-23 05:50:22'),(44,3,1,2,'accepted','2025-06-23 07:26:19'),(46,6,1,1,'completed','2025-06-23 07:52:46'),(49,7,1,2,'pending','2025-06-23 08:04:47'),(50,6,3,1,'completed','2025-06-25 04:42:03');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `item_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `request_id` (`request_id`),
  KEY `item_id` (`item_id`),
  KEY `seller_id` (`seller_id`),
  KEY `buyer_id` (`buyer_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,42,5,1,2,5,'jhgldtyuyup[o','2025-06-23 07:13:19'),(2,43,5,1,1,5,';\'lkiuy;tyr8o ','2025-06-23 07:14:21'),(3,41,3,2,1,5,'hjkj, vcxthfymn','2025-06-23 07:17:36'),(4,41,3,2,1,5,'dfhgjfhjn','2025-06-23 07:30:12'),(5,43,5,1,1,5,'gff ','2025-06-23 07:31:59'),(6,50,6,1,3,4,'thanks a lot harishna its a great book for preparing placement thamks alot , the maintance is clean','2025-06-25 04:44:47');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hari krishna','harikrishna@jntua.ac.in','6304069520','$2b$10$2C6MkMvH4bj6LkFt6bbNkOtTuDfseZzgsvCVaEfWV8/Fg0Mge6poW','Cse',1,'JNTUA','/uploads/profiles/profile-1750678153366.png','2025-06-22 08:53:07'),(2,'rohit','rohit@jntua.ac.in','6304069521','$2b$10$TG0opVewAVvuKXXIJjE9reg3iQWVLrrLsMrMlR2dRSsEAx8nsLtXS','cse',1,'JNTUA',NULL,'2025-06-22 08:58:40'),(3,'rahul','rahul@gamil.com','6985243170','$2b$10$IhQ.TAMY.WBJo3PZr0oUw.e77MXm7U2/EHio/f7YZL/ZuBobFykNu','civil',3,'JNTUA',NULL,'2025-06-23 15:00:57'),(4,'saginala','saginalaharikrishna6@gmail.com','6304069520','$2b$10$JOzCn3Yl9M0s4vZkhzDZVOTHa1IEcZrEJ5e.ymzTIuUd42H7xRqKW','cse',1,'JNTUA','/uploads/profiles/profile-1750830591879.jpg','2025-06-25 11:17:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 11:33:47

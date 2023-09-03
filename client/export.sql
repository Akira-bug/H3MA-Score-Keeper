-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: 192.168.56.12    Database: HEMA_SK
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fencers`
--

DROP TABLE IF EXISTS `fencers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fencers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `club` varchar(60) NOT NULL,
  `weapon` varchar(20) NOT NULL,
  `score` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fencers`
--

LOCK TABLES `fencers` WRITE;
/*!40000 ALTER TABLE `fencers` DISABLE KEYS */;
INSERT INTO `fencers` VALUES (5,'Luffy','Strawhats','Fist',33),(8,'Anna','Dunedin','Hook Swords',8),(21,'Luke','Dunedin','Longsword',9),(24,'Cat','Meow','Claws',5),(25,'John Wick','None','Pencil',14),(27,'Froggy','Small Pond','Katana',5);
/*!40000 ALTER TABLE `fencers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fighter1` varchar(60) NOT NULL,
  `fighter2` varchar(60) NOT NULL,
  `score1` int NOT NULL DEFAULT '0',
  `score2` int NOT NULL DEFAULT '0',
  `weapon1` varchar(60) NOT NULL,
  `weapon2` varchar(60) NOT NULL,
  `victor` varchar(60) NOT NULL,
  `doubles` int NOT NULL DEFAULT '0',
  `exchanges` int NOT NULL DEFAULT '0',
  `duration` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (2,'Luke','Luffy',7,12,'Longsword','Fist','Luffy',6,4,4),(3,'Cat','John Wick',0,0,'Claws','Pencil','Draw',0,0,0),(4,'John Wick','Luffy',7,11,'Pencil','Fist','Luffy',3,10,5),(5,'Frog','Cat',6,5,'Katana','Claws','Frog',2,7,0),(6,'Luffy','Froggy',6,5,'Fist','Katana','Luffy',2,5,5),(7,'Anna','John Wick',8,7,'Hook Swords','Pencil','Anna',3,8,4),(8,'Luffy','Luke',4,2,'Fist','Longsword','Luffy',0,3,1);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-03 11:31:28

-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: medievales
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `Animations`
--

DROP TABLE IF EXISTS `Animations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Animations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companieName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `person` int DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `activate` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Animations`
--

LOCK TABLES `Animations` WRITE;
/*!40000 ALTER TABLE `Animations` DISABLE KEYS */;
INSERT INTO `Animations` VALUES (1,'ludovic moissinac','qsdqsd','0663264291','moissinac.ludovic@gmail.com',2,'le malzieu ville','France','48140','qsdqdqsdqd','1',1,'http://localhost:8080/images/boule_.jpg1731268772693.jpg','2024-11-10 19:59:32','2024-11-10 19:59:32');
/*!40000 ALTER TABLE `Animations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Archives`
--

DROP TABLE IF EXISTS `Archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Archives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) DEFAULT NULL,
  `years` varchar(255) DEFAULT NULL,
  `teaser` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Archives`
--

LOCK TABLES `Archives` WRITE;
/*!40000 ALTER TABLE `Archives` DISABLE KEYS */;
INSERT INTO `Archives` VALUES (4,'http://localhost:8080/images/1.JPG1731356057176.jpg','2012','','2024-11-11 20:14:17','2024-11-11 20:14:17'),(5,'http://localhost:8080/images/2.JPG1731356076799.jpg','2012','','2024-11-11 20:14:36','2024-11-11 20:14:36'),(6,'http://localhost:8080/images/3.JPG1731356132173.jpg','2012','','2024-11-11 20:15:32','2024-11-11 20:15:32'),(7,'http://localhost:8080/images/4.JPG1731356148687.jpg','2012','','2024-11-11 20:15:48','2024-11-11 20:15:48'),(8,'http://localhost:8080/images/5.JPG1731356182565.jpg','2012','','2024-11-11 20:16:22','2024-11-11 20:16:22'),(9,'http://localhost:8080/images/6.JPG1731527608636.jpg','2012','','2024-11-13 19:53:28','2024-11-13 19:53:28'),(10,'http://localhost:8080/images/7.JPG1731527877354.jpg','2012','','2024-11-13 19:57:57','2024-11-13 19:57:57'),(11,'http://localhost:8080/images/8.JPG1731527928510.jpg','2012','','2024-11-13 19:58:48','2024-11-13 19:58:48'),(12,'http://localhost:8080/images/9.JPG1731528153271.jpg','2012','','2024-11-13 20:02:33','2024-11-13 20:02:33'),(13,'http://localhost:8080/images/10.JPG1731528298619.jpg','2012','','2024-11-13 20:04:58','2024-11-13 20:04:58'),(14,'http://localhost:8080/images/11.JPG1731528570489.jpg','2012','','2024-11-13 20:09:30','2024-11-13 20:09:30'),(15,'http://localhost:8080/images/12.JPG1731528626547.jpg','2012','','2024-11-13 20:10:26','2024-11-13 20:10:26'),(16,'http://localhost:8080/images/13.JPG1731528795579.jpg','2012','','2024-11-13 20:13:15','2024-11-13 20:13:15'),(17,'http://localhost:8080/images/14.JPG1731528944785.jpg','2012','','2024-11-13 20:15:44','2024-11-13 20:15:44'),(18,'http://localhost:8080/images/1.JPG1731529549053.jpg','2013','','2024-11-13 20:25:49','2024-11-13 20:25:49');
/*!40000 ALTER TABLE `Archives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Artisans`
--

DROP TABLE IF EXISTS `Artisans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Artisans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companieName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `person` int DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `activate` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `taille` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Artisans`
--

LOCK TABLES `Artisans` WRITE;
/*!40000 ALTER TABLE `Artisans` DISABLE KEYS */;
INSERT INTO `Artisans` VALUES (1,'ludovic moissinac','qssd','0663264291','moissinac.ludovic@gmail.com',2,'le malzieu ville','France','48140','qdkjqjlskdqlskjdlqkjqslkjqs','11111',1,'http://localhost:8080/images/banner_programmation.jpeg1731266312303.jpg','2X3','2024-11-10 19:18:32','2024-11-10 19:18:32');
/*!40000 ALTER TABLE `Artisans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Campements`
--

DROP TABLE IF EXISTS `Campements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Campements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companieName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `person` int DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `activate` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Campements`
--

LOCK TABLES `Campements` WRITE;
/*!40000 ALTER TABLE `Campements` DISABLE KEYS */;
INSERT INTO `Campements` VALUES (1,'ludovic moissinac','qsdqdqd','0663264291','moissinac.ludovic@gmail.com',2,'le malzieu ville','France','48140','qsqsdqsdqdqsdqsd','1000',1,'http://localhost:8080/images/AdobeStock_807434183.jpeg1731265740455.jpg','2024-11-10 19:09:00','2024-11-10 19:09:00');
/*!40000 ALTER TABLE `Campements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partenaires`
--

DROP TABLE IF EXISTS `Partenaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partenaires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partenaireName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `formule` varchar(255) DEFAULT NULL,
  `montant` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `reglement` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `activate` tinyint(1) DEFAULT NULL,
  `texte` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partenaires`
--

LOCK TABLES `Partenaires` WRITE;
/*!40000 ALTER TABLE `Partenaires` DISABLE KEYS */;
/*!40000 ALTER TABLE `Partenaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Troupes`
--

DROP TABLE IF EXISTS `Troupes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Troupes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companieName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `person` int DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `activate` tinyint(1) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Troupes`
--

LOCK TABLES `Troupes` WRITE;
/*!40000 ALTER TABLE `Troupes` DISABLE KEYS */;
INSERT INTO `Troupes` VALUES (1,'ludo','ludo','0663264291','moissinac.ludovic@gmail.com',1,'le malzieu ville','France','48140','ffffff','1000',1,'http://localhost:8080/images/que-es-www-1.jpg1731260728989.jpg','2024-11-10 17:45:29','2024-11-10 17:45:29');
/*!40000 ALTER TABLE `Troupes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `troupe` tinyint(1) DEFAULT NULL,
  `campement` tinyint(1) DEFAULT NULL,
  `artisan` tinyint(1) DEFAULT NULL,
  `animation` tinyint(1) DEFAULT NULL,
  `marche` tinyint(1) DEFAULT NULL,
  `partenaire` tinyint(1) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-24 16:25:04

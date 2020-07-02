-- MySQL dump 10.13  Distrib 5.7.8-rc, for Linux (x86_64)
--
-- Host: localhost    Database: titans_dev_db
-- ------------------------------------------------------
-- Server version	5.7.8-rc

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `capital`
--

DROP TABLE IF EXISTS `capital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `capital` (
  `id` int(11) NOT NULL,
  `capital_amount` decimal(12,2) DEFAULT '0.00',
  `reserve` decimal(12,2) DEFAULT '0.00',
  `number_of_credits` decimal(10,0) DEFAULT '0',
  `number_of_inversions` decimal(10,0) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capital`
--

LOCK TABLES `capital` WRITE;
/*!40000 ALTER TABLE `capital` DISABLE KEYS */;
INSERT INTO `capital` VALUES (1,100060000.00,NULL,NULL,NULL);
/*!40000 ALTER TABLE `capital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `moto_id` varchar(36) DEFAULT NULL,
  `driver_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_651d541afec4e0e5f9d057214de` (`moto_id`),
  KEY `FK_39fd6f3b0b8562a575e49490664` (`driver_id`),
  CONSTRAINT `FK_39fd6f3b0b8562a575e49490664` FOREIGN KEY (`driver_id`) REFERENCES `driver_license` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_651d541afec4e0e5f9d057214de` FOREIGN KEY (`moto_id`) REFERENCES `motor_cycle` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('636dc749-2395-4174-a8ef-4343d8876f2c','2020-07-01 19:50:35.993000','2020-07-01 19:50:35.993000','bbc8d011-25f2-424c-ae92-b44cffe593f5',NULL),('fe07b72b-9f3b-4c62-88cf-0456f932d069','2020-07-01 20:24:19.721000','2020-07-01 20:24:19.721000','bbc8d011-25f2-424c-ae92-b44cffe593f5','14b4b91b-e065-4255-b126-ed00f031936e');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `worker_id` varchar(36) DEFAULT NULL,
  `name_product` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0eeea1c7a3c3e2d654d6106ef7f` (`worker_id`),
  CONSTRAINT `FK_0eeea1c7a3c3e2d654d6106ef7f` FOREIGN KEY (`worker_id`) REFERENCES `users_app` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES ('085e74bd-a37c-4f49-95b2-6470e254aa99','2020-07-01 00:03:42.907000','2020-07-01 00:03:42.907000','ae6f3e60-3f57-4126-ab39-4e0e21943fcc',NULL),('cbf8a7c5-70ac-4cff-84de-05c6202607c3','2020-07-01 00:42:52.714000','2020-07-01 00:42:52.714000','d73f3d16-147b-4da6-afdf-a51beb1dec24','moto');
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_detail`
--

DROP TABLE IF EXISTS `credit_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_detail` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `price` decimal(9,2) NOT NULL,
  `interes_rate` decimal(3,2) NOT NULL,
  `number_of_instalments` int(2) NOT NULL,
  `credit_id` varchar(36) DEFAULT NULL,
  `product_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2b64fad0bae8dbfab5b2adbe8ac` (`credit_id`),
  KEY `FK_4f5924ccda5a2e6dbfd1ce6bc69` (`product_id`),
  CONSTRAINT `FK_2b64fad0bae8dbfab5b2adbe8ac` FOREIGN KEY (`credit_id`) REFERENCES `credit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_4f5924ccda5a2e6dbfd1ce6bc69` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_detail`
--

LOCK TABLES `credit_detail` WRITE;
/*!40000 ALTER TABLE `credit_detail` DISABLE KEYS */;
INSERT INTO `credit_detail` VALUES ('0d10c9bd-220b-4434-aeb0-79956709c387','2020-07-01 19:46:01.156000','2020-07-01 19:46:01.156000',100000.00,3.50,4,'cbf8a7c5-70ac-4cff-84de-05c6202607c3',NULL);
/*!40000 ALTER TABLE `credit_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_payments`
--

DROP TABLE IF EXISTS `credit_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_payments` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `payment` decimal(9,2) NOT NULL,
  `credit_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d541ed8e01467eaa4fb3fcd584b` (`credit_id`),
  CONSTRAINT `FK_d541ed8e01467eaa4fb3fcd584b` FOREIGN KEY (`credit_id`) REFERENCES `credit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_payments`
--

LOCK TABLES `credit_payments` WRITE;
/*!40000 ALTER TABLE `credit_payments` DISABLE KEYS */;
INSERT INTO `credit_payments` VALUES ('0567aa15-24f5-4ce6-8321-9be464e9d728','2020-07-01 13:24:07.411000','2020-07-01 13:28:40.000000',30000.00,'cbf8a7c5-70ac-4cff-84de-05c6202607c3');
/*!40000 ALTER TABLE `credit_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_license`
--

DROP TABLE IF EXISTS `driver_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver_license` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `authorized_categories` varchar(100) DEFAULT NULL,
  `organis_of_traffic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_license`
--

LOCK TABLES `driver_license` WRITE;
/*!40000 ALTER TABLE `driver_license` DISABLE KEYS */;
INSERT INTO `driver_license` VALUES ('14b4b91b-e065-4255-b126-ed00f031936e','2020-07-01 17:49:06.737000','2020-07-01 17:49:06.737000','A2','Bogotá');
/*!40000 ALTER TABLE `driver_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inversion`
--

DROP TABLE IF EXISTS `inversion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inversion` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `payment` decimal(9,2) NOT NULL,
  `investor_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_04b7b168c11a67d6ed97cf1a4cf` (`investor_id`),
  CONSTRAINT `FK_04b7b168c11a67d6ed97cf1a4cf` FOREIGN KEY (`investor_id`) REFERENCES `users_app` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inversion`
--

LOCK TABLES `inversion` WRITE;
/*!40000 ALTER TABLE `inversion` DISABLE KEYS */;
INSERT INTO `inversion` VALUES ('4571ed36-b3a1-4267-bcca-838794aeb722','2020-07-02 15:39:49.511000','2020-07-02 15:39:49.511000',60000.00,'12df957f-ca36-41ee-9a04-d35971d2742c'),('d54b5dfb-6891-4bee-a329-47517a7a2d7c','2020-06-30 20:06:47.797000','2020-06-30 20:06:47.797000',100000.00,'12df957f-ca36-41ee-9a04-d35971d2742c'),('e35d8f94-7bd4-436f-896b-d6e7bbb67f91','2020-06-30 21:15:32.371000','2020-06-30 21:15:32.371000',50000.00,'12df957f-ca36-41ee-9a04-d35971d2742c');
/*!40000 ALTER TABLE `inversion` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `capital_AI`
AFTER INSERT ON `inversion`
FOR EACH ROW
	BEGIN
		UPDATE `capital` 
        SET `capital_amount` = `capital_amount` + NEW.`payment`,
            `number_of_inversions` = `number_of_inversions` + 1
        WHERE `id` = 1;
	END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `inversion_detail`
--

DROP TABLE IF EXISTS `inversion_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inversion_detail` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `interes_rate` decimal(3,2) DEFAULT NULL,
  `number_of_month` int(2) DEFAULT NULL,
  `inversion_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bc5b9a75498ad1b2e10b26340e7` (`inversion_id`),
  CONSTRAINT `FK_bc5b9a75498ad1b2e10b26340e7` FOREIGN KEY (`inversion_id`) REFERENCES `inversion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inversion_detail`
--

LOCK TABLES `inversion_detail` WRITE;
/*!40000 ALTER TABLE `inversion_detail` DISABLE KEYS */;
INSERT INTO `inversion_detail` VALUES ('005cf5dc-4106-409c-8ce9-aacd0f4949a7','2020-06-30 21:29:08.833000','2020-06-30 21:29:08.833000',4.50,4,'e35d8f94-7bd4-436f-896b-d6e7bbb67f91'),('48bab44b-4acb-46b2-b277-db38c4e1dbc9','2020-06-30 20:18:47.618000','2020-06-30 20:18:47.618000',5.34,3,'d54b5dfb-6891-4bee-a329-47517a7a2d7c');
/*!40000 ALTER TABLE `inversion_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motor_cycle`
--

DROP TABLE IF EXISTS `motor_cycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motor_cycle` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `reference` varchar(100) DEFAULT NULL,
  `engine` varchar(100) DEFAULT NULL,
  `cylinder_capacity` varchar(100) DEFAULT NULL,
  `performance` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motor_cycle`
--

LOCK TABLES `motor_cycle` WRITE;
/*!40000 ALTER TABLE `motor_cycle` DISABLE KEYS */;
INSERT INTO `motor_cycle` VALUES ('bbc8d011-25f2-424c-ae92-b44cffe593f5','2020-07-01 17:48:35.469000','2020-07-01 17:48:35.469000','NDK125','CGR 4T OHV','125 c.c','10.34');
/*!40000 ALTER TABLE `motor_cycle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movement`
--

DROP TABLE IF EXISTS `movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movement` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_type_id` varchar(36) DEFAULT NULL,
  `movement_id` varchar(255) DEFAULT NULL,
  `movement_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aa4ba1d318fdd00912f8bcbf947` (`user_type_id`),
  CONSTRAINT `FK_aa4ba1d318fdd00912f8bcbf947` FOREIGN KEY (`user_type_id`) REFERENCES `movement_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movement`
--

LOCK TABLES `movement` WRITE;
/*!40000 ALTER TABLE `movement` DISABLE KEYS */;
/*!40000 ALTER TABLE `movement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movement_type`
--

DROP TABLE IF EXISTS `movement_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movement_type` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name_type` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movement_type`
--

LOCK TABLES `movement_type` WRITE;
/*!40000 ALTER TABLE `movement_type` DISABLE KEYS */;
INSERT INTO `movement_type` VALUES ('6674c0da-e19e-40df-9c48-d038e2580e6c','2020-07-01 22:07:19.767000','2020-07-01 22:07:19.767000','Credit'),('d4df6931-64bb-4231-b20e-abc75b1d7640','2020-07-01 22:16:16.466000','2020-07-01 22:16:16.466000','Payment'),('f3343714-42a2-4818-b468-24b80ee4014a','2020-07-01 22:07:57.101000','2020-07-01 22:07:57.101000','Inversion'),('f7a78cd1-c393-4147-8875-5ff5a09b8feb','2020-07-01 22:09:44.172000','2020-07-01 22:09:44.172000','Withdraw');
/*!40000 ALTER TABLE `movement_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `category_id` varchar(36) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0dce9bc93c2d2c399982d04bef1` (`category_id`),
  CONSTRAINT `FK_0dce9bc93c2d2c399982d04bef1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('162756c9-3577-47c6-8734-70a28a1c3b1c','2020-07-01 19:52:17.355000','2020-07-01 19:52:17.355000','636dc749-2395-4174-a8ef-4343d8876f2c',''),('17c4af94-6a1e-46c6-996e-280f7456e4b8','2020-07-01 21:37:05.292000','2020-07-01 21:37:05.292000','fe07b72b-9f3b-4c62-88cf-0456f932d069','Moto&driverLicense');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type_app`
--

DROP TABLE IF EXISTS `user_type_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type_app` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name_type` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type_app`
--

LOCK TABLES `user_type_app` WRITE;
/*!40000 ALTER TABLE `user_type_app` DISABLE KEYS */;
INSERT INTO `user_type_app` VALUES ('05b0b99c-f10e-4e3a-88d1-b3187d6998ee','2020-06-25 23:51:33.257000','2020-06-25 23:51:33.257000','worker'),('cf7c6fc1-913d-4031-aef7-aebbb5f9f11a','2020-06-26 00:12:46.968000','2020-06-30 15:47:25.000000','investor');
/*!40000 ALTER TABLE `user_type_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_app`
--

DROP TABLE IF EXISTS `users_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_app` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `number_id` varchar(11) DEFAULT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `user_type_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_78eba2502899bee8d2328035ca1` (`user_type_id`),
  CONSTRAINT `FK_78eba2502899bee8d2328035ca1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type_app` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_app`
--

LOCK TABLES `users_app` WRITE;
/*!40000 ALTER TABLE `users_app` DISABLE KEYS */;
INSERT INTO `users_app` VALUES ('12df957f-ca36-41ee-9a04-d35971d2742c','2020-06-30 15:50:51.695000','2020-06-30 15:50:51.695000','3434674','Betty2','Holberton','234545454','1210@holberton.com','cf7c6fc1-913d-4031-aef7-aebbb5f9f11a'),('ae6f3e60-3f57-4126-ab39-4e0e21943fcc','2020-06-30 15:51:59.839000','2020-06-30 15:53:17.000000','3894345434','Col','Berton','5894545454','1211@holberton.com','05b0b99c-f10e-4e3a-88d1-b3187d6998ee'),('d73f3d16-147b-4da6-afdf-a51beb1dec24','2020-07-01 00:27:50.735000','2020-07-01 00:27:50.735000','43894045434','Col2','Berton2','5894545454','1211@holberton.com','05b0b99c-f10e-4e3a-88d1-b3187d6998ee');
/*!40000 ALTER TABLE `users_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdrawal` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `withdraw_funds` decimal(9,2) NOT NULL,
  `inversion_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_006a3def1d86b679e24eb6809e7` (`inversion_id`),
  CONSTRAINT `FK_006a3def1d86b679e24eb6809e7` FOREIGN KEY (`inversion_id`) REFERENCES `inversion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal`
--

LOCK TABLES `withdrawal` WRITE;
/*!40000 ALTER TABLE `withdrawal` DISABLE KEYS */;
INSERT INTO `withdrawal` VALUES ('6aeba35e-cbd7-4daa-b60d-988e621361da','2020-06-30 21:51:02.014000','2020-06-30 21:51:02.014000',30000.00,'d54b5dfb-6891-4bee-a329-47517a7a2d7c'),('f0cdfd4f-393b-4891-af1c-82bc3269665d','2020-06-30 22:05:20.945000','2020-06-30 22:10:06.000000',7000.00,'e35d8f94-7bd4-436f-896b-d6e7bbb67f91');
/*!40000 ALTER TABLE `withdrawal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-02 15:42:36

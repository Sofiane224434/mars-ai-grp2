CREATE DATABASE  IF NOT EXISTS `marsai` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `marsai`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: marsai
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `ai_list`
--

DROP TABLE IF EXISTS `ai_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ai_name` varchar(100) NOT NULL,
  `included` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_list`
--

LOCK TABLES `ai_list` WRITE;
/*!40000 ALTER TABLE `ai_list` DISABLE KEYS */;
INSERT INTO `ai_list` VALUES (1,'Runway Gen-2',1);
/*!40000 ALTER TABLE `ai_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `comment` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_teamid_team_idx` (`user_id`),
  KEY `fk_movieid_movies_idx` (`movie_id`),
  CONSTRAINT `fk_movies_users_comments` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_comments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'Utilisation de Midjourney incroyable.'),(2,1,1,'ce film est très correct'),(3,1,1,'Très sombre'),(4,1,10,'huih'),(5,1,9,'fdf'),(6,1,11,'tres bien'),(7,1,8,'sdsd'),(8,1,12,'Très beau travail sur la colorimétrie.');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director_profile`
--

DROP TABLE IF EXISTS `director_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `marketting` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('mr','mme','iel') NOT NULL,
  `fix_phone` varchar(45) DEFAULT NULL,
  `mobile_phone` varchar(45) NOT NULL,
  `school` varchar(255) NOT NULL,
  `current_job` varchar(255) NOT NULL,
  `director_language` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movieid_movies_idx` (`movie_id`),
  CONSTRAINT `fk_movies_director` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director_profile`
--

LOCK TABLES `director_profile` WRITE;
/*!40000 ALTER TABLE `director_profile` DISABLE KEYS */;
INSERT INTO `director_profile` VALUES (1,1,'flavie.michel@laplateforme.io','Steven','Spielberg','123 Avenue des Caméras','Bâtiment B','75000','Paris','France','Oui','1985-05-15','mme','0102030405','0607080910','École de Cinéma','Réalisateur','français'),(12,12,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(13,13,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(14,14,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(15,15,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(16,16,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(17,17,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(18,18,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(19,19,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(20,20,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(21,21,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(22,22,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(23,23,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(24,24,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(25,25,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(26,26,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(27,27,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(28,28,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(29,29,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(30,30,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(31,31,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(32,32,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(33,33,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(34,34,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(35,35,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(36,36,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(37,37,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(38,38,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(39,39,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(40,40,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(41,41,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(42,42,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(43,43,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(44,44,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(45,45,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(46,46,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(47,47,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(48,48,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(49,49,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français'),(50,50,'nolan.ai@test.com','Christopher','Nolan','15 avenue du Cinéma','','75008','Paris','France','oui','1980-05-15','mr','0102030405','0600112233','Autodidacte','Réalisateur Numérique','Français');
/*!40000 ALTER TABLE `director_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email` (
  `id` int NOT NULL AUTO_INCREMENT,
  `object` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_teamid_team_idx` (`user_id`),
  KEY `fk_email_movieid_idx` (`movie_id`),
  CONSTRAINT `fk_autoemail_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_email_movieid` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (1,'Votre film est valide','Votre film est officiellement valide.',1,1,NULL),(2,'Felicitation !','L\'equipe de MarsAI a le plaisir de vous annoncer...',1,1,NULL),(3,'MarsAI - Décision','Bonjour Pierre, Excellente nouvelle...',2,9,'2026-04-07 12:08:30');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_original` varchar(255) NOT NULL,
  `subtitles` longtext NOT NULL,
  `videofile` varchar(255) NOT NULL,
  `language` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `prompt` longtext NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `synopsis_original` longtext NOT NULL,
  `classification` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `title_english` varchar(255) NOT NULL,
  `synopsis_english` longtext NOT NULL,
  `youtube_url` varchar(255) NOT NULL,
  `movie_duration` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_moviestatus_idx` (`status`),
  CONSTRAINT `fk_movies_status` FOREIGN KEY (`status`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Le Premier Film','soustitres.srt','film_01.mp4','fr','Description factice.','Un prompt généré par IA.',3,'Un synopsis en français.','Tout public','thumb_01.jpg','2026-03-26 13:11:38','2026-03-26 13:11:38','The First Movie','An English synopsis.','https://youtube.com/watch?v=test','00:15:00'),(2,'L\'Éveil de Mars','fr','mars_eveil.mp4','Français','Documentaire fiction.','Cinematic shot of Mars...',1,'L\'humanité découvre un secret enfoui.','Tout public','thumb1.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Mars Awakening','Humanity steps on Mars.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:15:00'),(3,'Cyberpunk 2099','en','cyber_2099.mp4','Anglais','Action sci-fi.','Neon city cyberpunk style...',1,'Une détective traque une IA dévoyée.','12+','thumb2.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Cyberpunk 2099','In a neon city...','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:08:30'),(4,'Le Dernier Océan','fr','ocean.mp4','Français','Drame écologique.','Deep blue ocean depth...',4,'La dernière goutte d\'eau pure.','Tout public','thumb3.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','The Last Ocean','The last drop...','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:12:00'),(5,'Odyssée IA','fr','ai_odyssey.mp4','Français','Réflexion sur l\'IA.','Abstract digital brain...',2,'Un ingénieur tombe amoureux.','Tout public','thumb4.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','AI Odyssey','AI awakens.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(6,'Ombres Chinoises','cn','shadows.mp4','Chinois','Animation.','Traditional shadow puppet...',2,'Un conte ancien revisité.','Tout public','thumb5.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Chinese Shadows','An ancient tale.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:03:20'),(7,'Course Temporelle','fr','time_run.mp4','Français','Action frénétique.','Time travel visual effects...',2,'Un homme court contre le temps.','16+','thumb6.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Time Race','A man races time.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:20:00'),(8,'Lumière d\'Étoile','en','starlight.mp4','Anglais','Poésie visuelle.','Starry night sky falling...',3,'Une étoile qui tombe sur Terre.','Tout public','thumb7.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Starlight','A falling star.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:04:10'),(9,'Le Mystère du Phare','fr','lighthouse.mp4','Français','Thriller.','Dark isolated lighthouse...',4,'Deux gardiens affrontent leurs cauchemars.','12+','thumb8.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Lighthouse Mystery','Two isolated keepers.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:18:00'),(10,'Symphonie Végétale','fr','nature.mp4','Français','Documentaire.','Forest macro photography...',1,'La vie secrète des plantes.','Tout public','thumb9.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Plant Symphony','Secret life of plants.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:10:00'),(11,'Horizon Perdu','es','horizon.mp4','Espagnol','Aventure.','Vast desert horizon cinematic...',4,'La quête périlleuse d\'un oasis.','Tout public','thumb10.jpg','2026-04-02 06:02:31','2026-04-02 06:02:31','Lost Horizon','Quest for a mythic oasis.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:14:30'),(12,'L\'Aube des Algorithmes','fr','aube_algo.mp4','Français','Thriller IA.','Cinematic shot...',4,'Un détective traque une IA.','12+','thumb_aube.jpg','2026-04-08 09:33:49','2026-04-08 09:33:49','Dawn of Algorithms','A detective tracks a rogue AI.','https://youtube.com/watch?v=demo123','00:15:00'),(13,'Synthe Lyon 13','fr','ai_odyssey.mp4','Français','Film de test #13 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #13: narration courte sur synthe et l\'IA dans Lyon.',1,'Synopsis test #13: une histoire breve se deroule entre Lyon et un futur assiste par IA.','12+','https://picsum.photos/id/1018/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Synthe 2025 - 13','Test synopsis #13: a short story unfolding between Lyon and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(14,'Prisme Toulouse 14','fr','ai_odyssey.mp4','Français','Film de test #14 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #14: narration courte sur prisme et l\'IA dans Toulouse.',1,'Synopsis test #14: une histoire breve se deroule entre Toulouse et un futur assiste par IA.','12+','https://picsum.photos/id/1025/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Prisme 2026 - 14','Test synopsis #14: a short story unfolding between Toulouse and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(15,'Chronique Paris 15','fr','ai_odyssey.mp4','Français','Film de test #15 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #15: narration courte sur chronique et l\'IA dans Paris.',1,'Synopsis test #15: une histoire breve se deroule entre Paris et un futur assiste par IA.','12+','https://picsum.photos/id/1035/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Chronique 2020 - 15','Test synopsis #15: a short story unfolding between Paris and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(16,'Spectre Nantes 16','fr','ai_odyssey.mp4','Français','Film de test #16 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #16: narration courte sur spectre et l\'IA dans Nantes.',1,'Synopsis test #16: une histoire breve se deroule entre Nantes et un futur assiste par IA.','12+','https://picsum.photos/id/1041/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Spectre 2021 - 16','Test synopsis #16: a short story unfolding between Nantes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(17,'Horizon Nice 17','fr','ai_odyssey.mp4','Français','Film de test #17 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #17: narration courte sur horizon et l\'IA dans Nice.',1,'Synopsis test #17: une histoire breve se deroule entre Nice et un futur assiste par IA.','12+','https://picsum.photos/id/1050/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Horizon 2022 - 17','Test synopsis #17: a short story unfolding between Nice and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(18,'Lueur Lille 18','fr','ai_odyssey.mp4','Français','Film de test #18 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #18: narration courte sur lueur et l\'IA dans Lille.',1,'Synopsis test #18: une histoire breve se deroule entre Lille et un futur assiste par IA.','12+','https://picsum.photos/id/1067/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Lueur 2023 - 18','Test synopsis #18: a short story unfolding between Lille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(19,'Paradoxe Bordeaux 19','fr','ai_odyssey.mp4','Français','Film de test #19 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #19: narration courte sur paradoxe et l\'IA dans Bordeaux.',1,'Synopsis test #19: une histoire breve se deroule entre Bordeaux et un futur assiste par IA.','12+','https://picsum.photos/id/1074/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Paradoxe 2024 - 19','Test synopsis #19: a short story unfolding between Bordeaux and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(20,'Impulse Rennes 20','fr','ai_odyssey.mp4','Français','Film de test #20 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #20: narration courte sur impulse et l\'IA dans Rennes.',1,'Synopsis test #20: une histoire breve se deroule entre Rennes et un futur assiste par IA.','12+','https://picsum.photos/id/1084/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Impulse 2025 - 20','Test synopsis #20: a short story unfolding between Rennes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(21,'Echos Marseille 21','fr','ai_odyssey.mp4','Français','Film de test #21 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #21: narration courte sur echos et l\'IA dans Marseille.',1,'Synopsis test #21: une histoire breve se deroule entre Marseille et un futur assiste par IA.','12+','https://picsum.photos/id/1080/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Echos 2026 - 21','Test synopsis #21: a short story unfolding between Marseille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(22,'Neon Arles 22','fr','ai_odyssey.mp4','Français','Film de test #22 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #22: narration courte sur neon et l\'IA dans Arles.',1,'Synopsis test #22: une histoire breve se deroule entre Arles et un futur assiste par IA.','12+','https://picsum.photos/id/1018/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Neon 2020 - 22','Test synopsis #22: a short story unfolding between Arles and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(23,'Mirage Lyon 23','fr','ai_odyssey.mp4','Français','Film de test #23 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #23: narration courte sur mirage et l\'IA dans Lyon.',1,'Synopsis test #23: une histoire breve se deroule entre Lyon et un futur assiste par IA.','12+','https://picsum.photos/id/1025/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Mirage 2021 - 23','Test synopsis #23: a short story unfolding between Lyon and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(24,'Signal Toulouse 24','fr','ai_odyssey.mp4','Français','Film de test #24 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #24: narration courte sur signal et l\'IA dans Toulouse.',1,'Synopsis test #24: une histoire breve se deroule entre Toulouse et un futur assiste par IA.','12+','https://picsum.photos/id/1035/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Signal 2022 - 24','Test synopsis #24: a short story unfolding between Toulouse and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(25,'Pulse Paris 25','fr','ai_odyssey.mp4','Français','Film de test #25 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #25: narration courte sur pulse et l\'IA dans Paris.',1,'Synopsis test #25: une histoire breve se deroule entre Paris et un futur assiste par IA.','12+','https://picsum.photos/id/1041/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Pulse 2023 - 25','Test synopsis #25: a short story unfolding between Paris and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(26,'Aube Nantes 26','fr','ai_odyssey.mp4','Français','Film de test #26 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #26: narration courte sur aube et l\'IA dans Nantes.',1,'Synopsis test #26: une histoire breve se deroule entre Nantes et un futur assiste par IA.','12+','https://picsum.photos/id/1050/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Aube 2024 - 26','Test synopsis #26: a short story unfolding between Nantes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(27,'Orbite Nice 27','fr','ai_odyssey.mp4','Français','Film de test #27 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #27: narration courte sur orbite et l\'IA dans Nice.',1,'Synopsis test #27: une histoire breve se deroule entre Nice et un futur assiste par IA.','12+','https://picsum.photos/id/1067/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Orbite 2025 - 27','Test synopsis #27: a short story unfolding between Nice and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(28,'Rive Lille 28','fr','ai_odyssey.mp4','Français','Film de test #28 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #28: narration courte sur rive et l\'IA dans Lille.',1,'Synopsis test #28: une histoire breve se deroule entre Lille et un futur assiste par IA.','12+','https://picsum.photos/id/1074/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Rive 2026 - 28','Test synopsis #28: a short story unfolding between Lille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(29,'Code Bordeaux 29','fr','ai_odyssey.mp4','Français','Film de test #29 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #29: narration courte sur code et l\'IA dans Bordeaux.',1,'Synopsis test #29: une histoire breve se deroule entre Bordeaux et un futur assiste par IA.','12+','https://picsum.photos/id/1084/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Code 2020 - 29','Test synopsis #29: a short story unfolding between Bordeaux and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(30,'Sillage Rennes 30','fr','ai_odyssey.mp4','Français','Film de test #30 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #30: narration courte sur sillage et l\'IA dans Rennes.',1,'Synopsis test #30: une histoire breve se deroule entre Rennes et un futur assiste par IA.','12+','https://picsum.photos/id/1080/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Sillage 2021 - 30','Test synopsis #30: a short story unfolding between Rennes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(31,'Altitude Marseille 31','fr','ai_odyssey.mp4','Français','Film de test #31 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #31: narration courte sur altitude et l\'IA dans Marseille.',1,'Synopsis test #31: une histoire breve se deroule entre Marseille et un futur assiste par IA.','12+','https://picsum.photos/id/1018/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Altitude 2022 - 31','Test synopsis #31: a short story unfolding between Marseille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(32,'Matrice Arles 32','fr','ai_odyssey.mp4','Français','Film de test #32 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #32: narration courte sur matrice et l\'IA dans Arles.',1,'Synopsis test #32: une histoire breve se deroule entre Arles et un futur assiste par IA.','12+','https://picsum.photos/id/1025/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Matrice 2023 - 32','Test synopsis #32: a short story unfolding between Arles and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(33,'Synthe Lyon 33','fr','ai_odyssey.mp4','Français','Film de test #33 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #33: narration courte sur synthe et l\'IA dans Lyon.',1,'Synopsis test #33: une histoire breve se deroule entre Lyon et un futur assiste par IA.','12+','https://picsum.photos/id/1035/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Synthe 2024 - 33','Test synopsis #33: a short story unfolding between Lyon and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(34,'Prisme Toulouse 34','fr','ai_odyssey.mp4','Français','Film de test #34 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #34: narration courte sur prisme et l\'IA dans Toulouse.',1,'Synopsis test #34: une histoire breve se deroule entre Toulouse et un futur assiste par IA.','12+','https://picsum.photos/id/1041/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Prisme 2025 - 34','Test synopsis #34: a short story unfolding between Toulouse and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(35,'Chronique Paris 35','fr','ai_odyssey.mp4','Français','Film de test #35 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #35: narration courte sur chronique et l\'IA dans Paris.',1,'Synopsis test #35: une histoire breve se deroule entre Paris et un futur assiste par IA.','12+','https://picsum.photos/id/1050/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Chronique 2026 - 35','Test synopsis #35: a short story unfolding between Paris and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(36,'Spectre Nantes 36','fr','ai_odyssey.mp4','Français','Film de test #36 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #36: narration courte sur spectre et l\'IA dans Nantes.',1,'Synopsis test #36: une histoire breve se deroule entre Nantes et un futur assiste par IA.','12+','https://picsum.photos/id/1067/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Spectre 2020 - 36','Test synopsis #36: a short story unfolding between Nantes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(37,'Horizon Nice 37','fr','ai_odyssey.mp4','Français','Film de test #37 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #37: narration courte sur horizon et l\'IA dans Nice.',1,'Synopsis test #37: une histoire breve se deroule entre Nice et un futur assiste par IA.','12+','https://picsum.photos/id/1074/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Horizon 2021 - 37','Test synopsis #37: a short story unfolding between Nice and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(38,'Lueur Lille 38','fr','ai_odyssey.mp4','Français','Film de test #38 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #38: narration courte sur lueur et l\'IA dans Lille.',1,'Synopsis test #38: une histoire breve se deroule entre Lille et un futur assiste par IA.','12+','https://picsum.photos/id/1084/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Lueur 2022 - 38','Test synopsis #38: a short story unfolding between Lille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(39,'Paradoxe Bordeaux 39','fr','ai_odyssey.mp4','Français','Film de test #39 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #39: narration courte sur paradoxe et l\'IA dans Bordeaux.',1,'Synopsis test #39: une histoire breve se deroule entre Bordeaux et un futur assiste par IA.','12+','https://picsum.photos/id/1080/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Paradoxe 2023 - 39','Test synopsis #39: a short story unfolding between Bordeaux and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(40,'Impulse Rennes 40','fr','ai_odyssey.mp4','Français','Film de test #40 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #40: narration courte sur impulse et l\'IA dans Rennes.',1,'Synopsis test #40: une histoire breve se deroule entre Rennes et un futur assiste par IA.','12+','https://picsum.photos/id/1018/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Impulse 2024 - 40','Test synopsis #40: a short story unfolding between Rennes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(41,'Echos Marseille 41','fr','ai_odyssey.mp4','Français','Film de test #41 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #41: narration courte sur echos et l\'IA dans Marseille.',1,'Synopsis test #41: une histoire breve se deroule entre Marseille et un futur assiste par IA.','12+','https://picsum.photos/id/1025/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Echos 2025 - 41','Test synopsis #41: a short story unfolding between Marseille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(42,'Neon Arles 42','fr','ai_odyssey.mp4','Français','Film de test #42 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #42: narration courte sur neon et l\'IA dans Arles.',1,'Synopsis test #42: une histoire breve se deroule entre Arles et un futur assiste par IA.','12+','https://picsum.photos/id/1035/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Neon 2026 - 42','Test synopsis #42: a short story unfolding between Arles and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(43,'Mirage Lyon 43','fr','ai_odyssey.mp4','Français','Film de test #43 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #43: narration courte sur mirage et l\'IA dans Lyon.',1,'Synopsis test #43: une histoire breve se deroule entre Lyon et un futur assiste par IA.','12+','https://picsum.photos/id/1041/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Mirage 2020 - 43','Test synopsis #43: a short story unfolding between Lyon and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(44,'Signal Toulouse 44','fr','ai_odyssey.mp4','Français','Film de test #44 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #44: narration courte sur signal et l\'IA dans Toulouse.',1,'Synopsis test #44: une histoire breve se deroule entre Toulouse et un futur assiste par IA.','12+','https://picsum.photos/id/1050/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Signal 2021 - 44','Test synopsis #44: a short story unfolding between Toulouse and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(45,'Pulse Paris 45','fr','ai_odyssey.mp4','Français','Film de test #45 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #45: narration courte sur pulse et l\'IA dans Paris.',1,'Synopsis test #45: une histoire breve se deroule entre Paris et un futur assiste par IA.','12+','https://picsum.photos/id/1067/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Pulse 2022 - 45','Test synopsis #45: a short story unfolding between Paris and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(46,'Aube Nantes 46','fr','ai_odyssey.mp4','Français','Film de test #46 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #46: narration courte sur aube et l\'IA dans Nantes.',1,'Synopsis test #46: une histoire breve se deroule entre Nantes et un futur assiste par IA.','12+','https://picsum.photos/id/1074/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Aube 2023 - 46','Test synopsis #46: a short story unfolding between Nantes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(47,'Orbite Nice 47','fr','ai_odyssey.mp4','Français','Film de test #47 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #47: narration courte sur orbite et l\'IA dans Nice.',1,'Synopsis test #47: une histoire breve se deroule entre Nice et un futur assiste par IA.','12+','https://picsum.photos/id/1084/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Orbite 2024 - 47','Test synopsis #47: a short story unfolding between Nice and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(48,'Rive Lille 48','fr','ai_odyssey.mp4','Français','Film de test #48 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #48: narration courte sur rive et l\'IA dans Lille.',1,'Synopsis test #48: une histoire breve se deroule entre Lille et un futur assiste par IA.','12+','https://picsum.photos/id/1080/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Rive 2025 - 48','Test synopsis #48: a short story unfolding between Lille and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(49,'Code Bordeaux 49','fr','ai_odyssey.mp4','Français','Film de test #49 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #49: narration courte sur code et l\'IA dans Bordeaux.',1,'Synopsis test #49: une histoire breve se deroule entre Bordeaux et un futur assiste par IA.','12+','https://picsum.photos/id/1018/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Code 2026 - 49','Test synopsis #49: a short story unfolding between Bordeaux and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45'),(50,'Sillage Rennes 50','fr','ai_odyssey.mp4','Français','Film de test #50 genere automatiquement pour simuler un catalogue public realiste. Cette entree reutilise la video source afin de valider l\'affichage, la pagination et les filtres.','Prompt de test #50: narration courte sur sillage et l\'IA dans Rennes.',1,'Synopsis test #50: une histoire breve se deroule entre Rennes et un futur assiste par IA.','12+','https://picsum.photos/id/1025/1200/675','2026-04-15 08:03:35','2026-04-15 08:03:35','Sillage 2020 - 50','Test synopsis #50: a short story unfolding between Rennes and an AI-assisted future.','https://www.youtube.com/watch?v=dQw4w9WgXcQ','00:05:45');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `status` enum('subscribed','unsubscribed') NOT NULL DEFAULT 'subscribed',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_newsletter_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter`
--

LOCK TABLES `newsletter` WRITE;
/*!40000 ALTER TABLE `newsletter` DISABLE KEYS */;
INSERT INTO `newsletter` VALUES (1,'test+newsletterpublic@laposte.net','unsubscribed'),(2,'malo.martiniani@laplateforme.io','subscribed'),(3,'sofiane.kherarfa@laplateforme.io','subscribed');
/*!40000 ALTER TABLE `newsletter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenshots`
--

DROP TABLE IF EXISTS `screenshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screenshots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_screenshots_movies` (`movie_id`),
  CONSTRAINT `fk_screenshots_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenshots`
--

LOCK TABLES `screenshots` WRITE;
/*!40000 ALTER TABLE `screenshots` DISABLE KEYS */;
/*!40000 ALTER TABLE `screenshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socials`
--

DROP TABLE IF EXISTS `socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `social_name` varchar(100) NOT NULL,
  `social_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_socials_movies` (`movie_id`),
  CONSTRAINT `fk_socials_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socials`
--

LOCK TABLES `socials` WRITE;
/*!40000 ALTER TABLE `socials` DISABLE KEYS */;
/*!40000 ALTER TABLE `socials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sound_data`
--

DROP TABLE IF EXISTS `sound_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sound_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sound` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `movie_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sound_data_movies` (`movie_id`),
  CONSTRAINT `fk_sound_data_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sound_data`
--

LOCK TABLES `sound_data` WRITE;
/*!40000 ALTER TABLE `sound_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `sound_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'pending'),(2,'rejected'),(3,'review'),(4,'approved'),(5,'top50'),(6,'top5');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_ai`
--

DROP TABLE IF EXISTS `used_ai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_ai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `ai_name` int NOT NULL,
  `category` enum('script','movie','postprod') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usedai_movies_idx` (`movie_id`),
  KEY `fk_usedai_ai_list_idx` (`ai_name`),
  CONSTRAINT `fk_usedai_ai_list` FOREIGN KEY (`ai_name`) REFERENCES `ai_list` (`id`),
  CONSTRAINT `fk_usedai_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_ai`
--

LOCK TABLES `used_ai` WRITE;
/*!40000 ALTER TABLE `used_ai` DISABLE KEYS */;
INSERT INTO `used_ai` VALUES (1,12,1,'movie');
/*!40000 ALTER TABLE `used_ai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `status` enum('admin','jury') NOT NULL,
  `token_access` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jury@marsai.fr','jury','DEV_TEMP_TOKEN'),(2,'admin@marsai.fr','admin','tav-admin-local-1'),(3,'flavie.michel@laplateforme.io','admin','tav-admin-flavie-1'),(4,'marsai.grp2@gmail.com','admin','tav-admin-env-1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_movies`
--

DROP TABLE IF EXISTS `users_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movieid_movies_idx` (`movie_id`),
  KEY `fk_teamid_team_idx` (`user_id`),
  CONSTRAINT `fk_movies_users_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_movies_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_movies`
--

LOCK TABLES `users_movies` WRITE;
/*!40000 ALTER TABLE `users_movies` DISABLE KEYS */;
INSERT INTO `users_movies` VALUES (3,1,1),(4,2,1),(5,3,1),(6,4,1),(7,5,1),(8,6,1),(9,7,1),(10,8,1),(11,9,1),(12,10,1),(13,11,1),(14,12,1);
/*!40000 ALTER TABLE `users_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'marsai'
--

--
-- Dumping routines for database 'marsai'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-15 13:37:14

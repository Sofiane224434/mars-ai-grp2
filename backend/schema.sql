-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 05, 2026 at 12:09 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marsai`
--
CREATE DATABASE IF NOT EXISTS `marsai` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `marsai`;

-- --------------------------------------------------------

--
-- Table structure for table `ai_list`
--

DROP TABLE IF EXISTS `ai_list`;
CREATE TABLE `ai_list` (
  `id` int NOT NULL,
  `ai_name` varchar(100) NOT NULL,
  `included` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ai_list`
--

INSERT INTO `ai_list` (`id`, `ai_name`, `included`) VALUES
(1, 'Runway Gen-2', 1),
(2, 'ChatGPT', 1),
(3, 'Runway', 1),
(4, 'Midjourney', 1),
(5, 'Sora', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `comment` longtext NOT NULL,
  `isprivate` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `movie_id`, `comment`, `isprivate`) VALUES
(1, 1, 1, 'Excellente maîtrise du prompt. La lumière est bluffante.', 0),
(2, 5, 2, 'À revoir au niveau de la synchro labiale.', 1),
(3, 1, 3, 'Le rendu généré par IA est extrêmement réaliste.', 0),
(4, 5, 4, 'Rythme effréné, l\'utilisation de Gen-2 est pertinente.', 0),
(5, 1, 5, 'Le scénario prend le pas sur la technique.', 0),
(6, 5, 6, 'Attention aux artefacts visuels à la minute 12.', 1),
(7, 1, 7, 'C\'est poétique et visuellement irréprochable.', 0),
(8, 5, 8, 'La déformation des visages crée un vrai malaise.', 0),
(9, 1, 9, 'La direction artistique est incroyable.', 0),
(10, 5, 10, 'Le message passe bien, transition fluide.', 0),
(11, 1, 11, 'Un bel hommage à la nature.', 0),
(12, 5, 12, 'La colorimétrie pourrait être plus chaude.', 1),
(13, 1, 13, 'Incroyable travail sur les textures.', 0),
(14, 5, 14, 'Le storytelling est parfaitement géré.', 0),
(15, 1, 15, 'Le sound design mériterait plus de profondeur.', 1),
(16, 5, 16, 'Génial, j\'ai adoré la fin.', 0),
(17, 1, 17, 'L\'approche hybride est maîtrisée.', 0),
(18, 5, 18, 'Quelques lenteurs au milieu du film.', 1),
(19, 1, 19, 'Le prompt engineering est du plus haut niveau.', 0),
(20, 5, 20, 'J\'aurais aimé en voir plus.', 0),
(21, 1, 21, 'Une tension palpable.', 0),
(22, 5, 22, 'L\'intégration musicale est parfaite.', 0),
(23, 1, 23, 'Manque de clarté dans le synopsis.', 1),
(24, 5, 24, 'Visuellement, c\'est le meilleur de la sélection.', 0),
(25, 1, 25, 'Le cadrage est très original.', 0),
(26, 5, 26, 'Un peu trop sombre sur certains plans.', 1),
(27, 1, 27, 'L\'histoire est captivante.', 0),
(28, 5, 28, 'Les effets spéciaux sont invisibles, bravo.', 0),
(29, 1, 29, 'Un concept novateur et bien exécuté.', 0),
(30, 5, 30, 'Je recommande vivement.', 0),
(31, 1, 31, 'Une vraie réflexion sur notre époque.', 0),
(32, 5, 32, 'Les acteurs (générés) manquent d\'expression.', 1),
(33, 1, 33, 'Du grand art numérique.', 0),
(34, 5, 34, 'La bande-son est hypnotique.', 0),
(35, 1, 35, 'Un voyage sensoriel inédit.', 0),
(36, 5, 36, 'Le script aurait pu être plus poussé.', 1),
(37, 1, 37, 'L\'esthétique cyberpunk est sublime.', 0),
(38, 5, 38, 'Jeu de lumières très intéressant.', 0),
(39, 1, 39, 'Une réussite technique.', 0),
(40, 5, 40, 'L\'émotion est bien présente.', 0),
(41, 1, 41, 'L\'abstraction est un pari risqué mais réussi.', 0),
(42, 5, 42, 'Je n\'ai pas tout compris, mais c\'est beau.', 1),
(43, 1, 43, 'Le meilleur court-métrage expérimental.', 0),
(44, 5, 44, 'Les couleurs sont magnifiques.', 0),
(45, 1, 45, 'Un peu contemplatif.', 1),
(46, 5, 46, 'Techniquement irréprochable.', 0),
(47, 1, 47, 'L\'utilisation de Sora est évidente ici.', 0),
(48, 5, 48, 'Un vrai coup de cœur.', 0),
(49, 1, 49, 'L\'animation est fluide.', 0),
(50, 5, 50, 'Le rendu de l\'eau est fou.', 0),
(51, 1, 51, 'Une vision dystopique glaçante.', 0),
(52, 5, 52, 'Très bon choix de voix-off.', 0),
(53, 1, 53, 'L\'interface UI/UX dans le film est superbe.', 0),
(54, 5, 54, 'On sent l\'influence de Matrix.', 0),
(55, 1, 55, 'Le meilleur scénario de l\'année.', 0),
(56, 5, 56, 'La post-prod a fait des miracles.', 0),
(57, 1, 57, 'Une petite erreur de raccord à 2:30.', 1),
(58, 5, 58, 'J\'adhère totalement au concept.', 0),
(59, 1, 59, 'Le travail sur les ombres est titanesque.', 0),
(60, 5, 60, 'Une conclusion magistrale.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `director_profile`
--

DROP TABLE IF EXISTS `director_profile`;
CREATE TABLE `director_profile` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
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
  `director_language` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `director_profile`
--

INSERT INTO `director_profile` (`id`, `movie_id`, `email`, `firstname`, `lastname`, `address`, `address2`, `postal_code`, `city`, `country`, `marketting`, `date_of_birth`, `gender`, `fix_phone`, `mobile_phone`, `school`, `current_job`, `director_language`) VALUES
(1, 1, 'real1@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Français'),
(2, 2, 'real2@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Français'),
(3, 3, 'real3@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Anglais'),
(4, 4, 'real4@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Français'),
(5, 5, 'real5@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Espagnol'),
(6, 6, 'real6@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Français'),
(7, 7, 'real7@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Anglais'),
(8, 8, 'real8@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Français'),
(9, 9, 'real9@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Français'),
(10, 10, 'real10@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Anglais'),
(11, 11, 'real11@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Français'),
(12, 12, 'real12@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Français'),
(13, 13, 'real13@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Arabe'),
(14, 14, 'real14@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Français'),
(15, 15, 'real15@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Anglais'),
(16, 16, 'real16@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Français'),
(17, 17, 'real17@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Français'),
(18, 18, 'real18@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Anglais'),
(19, 19, 'real19@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Français'),
(20, 20, 'real20@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Français'),
(21, 21, 'real21@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Anglais'),
(22, 22, 'real22@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Français'),
(23, 23, 'real23@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Français'),
(24, 24, 'real24@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Anglais'),
(25, 25, 'real25@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Français'),
(26, 26, 'real26@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Français'),
(27, 27, 'real27@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Anglais'),
(28, 28, 'real28@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Français'),
(29, 29, 'real29@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Français'),
(30, 30, 'real30@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Anglais'),
(31, 31, 'real31@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Français'),
(32, 32, 'real32@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Français'),
(33, 33, 'real33@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Anglais'),
(34, 34, 'real34@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Français'),
(35, 35, 'real35@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Français'),
(36, 36, 'real36@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Anglais'),
(37, 37, 'real37@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Français'),
(38, 38, 'real38@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Français'),
(39, 39, 'real39@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Anglais'),
(40, 40, 'real40@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Français'),
(41, 41, 'real41@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Français'),
(42, 42, 'real42@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Anglais'),
(43, 43, 'real43@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Français'),
(44, 44, 'real44@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Français'),
(45, 45, 'real45@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Anglais'),
(46, 46, 'real46@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Français'),
(47, 47, 'real47@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Français'),
(48, 48, 'real48@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Anglais'),
(49, 49, 'real49@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Français'),
(50, 50, 'real50@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Français'),
(51, 51, 'real51@test.com', 'Jean', 'Dupont', '10 Rue de la Paix', 'Bâtiment B', '75001', 'Paris', 'France', 'Réseaux sociaux', '1985-05-15', 'mr', '0102030405', '0601020304', 'ESRA', 'Réalisateur', 'Anglais'),
(52, 52, 'real52@test.com', 'Marie', 'Martin', '12 Avenue Foch', 'Étage 4', '69002', 'Lyon', 'France', 'Presse', '1990-10-22', 'mme', '0478787878', '0611223344', 'La Fémis', 'Directrice Artistique', 'Français'),
(53, 53, 'real53@test.com', 'Luc', 'Bernard', '5 Boulevard Victor', 'Appartement 12', '13008', 'Marseille', 'France', 'Bouche à oreille', '1995-02-10', 'mr', '0491929394', '0655443322', 'Autodidacte', 'Motion Designer', 'Français'),
(54, 54, 'real54@test.com', 'Sophie', 'Dubois', '22 Allée des Pins', 'Résidence C', '31000', 'Toulouse', 'France', 'Newsletter', '1988-12-05', 'mme', '0561626364', '0699887766', 'ENSAV', 'VFX Artist', 'Anglais'),
(55, 55, 'real55@test.com', 'Pierre', 'Thomas', '1 Place Royale', 'Porte 3', '33000', 'Bordeaux', 'France', 'Réseaux sociaux', '1992-07-30', 'mr', '0556575859', '0688776655', '3iS', 'Étudiant', 'Français'),
(56, 56, 'real56@test.com', 'Julie', 'Robert', '14 Rue Nationale', 'Bâtiment A', '44000', 'Nantes', 'France', 'Presse', '1993-03-18', 'mme', '0240414243', '0677665544', 'Rubika', 'Game Designer', 'Français'),
(57, 57, 'real57@test.com', 'Paul', 'Richard', '8 Quai de la Loire', 'Loge gardien', '59000', 'Lille', 'France', 'Bouche à oreille', '1986-09-12', 'mr', '0320212223', '0666554433', 'Autodidacte', 'Animateur 3D', 'Anglais'),
(58, 58, 'real58@test.com', 'Camille', 'Petit', '3 Place Kleber', 'Étage 1', '67000', 'Strasbourg', 'France', 'Newsletter', '1998-11-25', 'iel', '0388899091', '0655443322', 'ESRA', 'Réalisatrice', 'Français'),
(59, 59, 'real59@test.com', 'Thomas', 'Durand', '7 Avenue Georges', 'Appartement 5', '34000', 'Montpellier', 'France', 'Réseaux sociaux', '1991-04-04', 'mr', '0467686970', '0644332211', 'La Fémis', 'Scénariste', 'Français'),
(60, 60, 'real60@test.com', 'Emma', 'Leroy', '18 Rue Saint-Malo', 'Bâtiment C', '35000', 'Rennes', 'France', 'Presse', '1996-08-08', 'mme', '0299989796', '0633221100', 'ENSAV', 'Productrice', 'Anglais');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` int NOT NULL,
  `object` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `sent_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`id`, `object`, `message`, `user_id`, `movie_id`, `sent_at`) VALUES
(1, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 1, NULL),
(2, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 2, NULL),
(3, 'Confirmation', 'Confirmation de réception.', 5, 3, NULL),
(4, 'Top 5', 'Félicitations pour le top 5.', 1, 4, NULL),
(5, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 5, NULL),
(6, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 6, NULL),
(7, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 7, NULL),
(8, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 8, NULL),
(9, 'Retours du jury', 'Voici les retours du comité.', 5, 9, NULL),
(10, 'Confirmation', 'Confirmation de réception.', 1, 10, NULL),
(11, 'Sélection MarsAI', 'Votre film est sélectionné.', 5, 11, NULL),
(12, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 12, NULL),
(13, 'Confirmation', 'Confirmation de réception.', 5, 13, NULL),
(14, 'Top 50', 'Félicitations pour le top 50.', 1, 14, NULL),
(15, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 15, NULL),
(16, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 16, NULL),
(17, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 17, NULL),
(18, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 18, NULL),
(19, 'Retours du jury', 'Voici les retours du comité.', 5, 19, NULL),
(20, 'Confirmation', 'Confirmation de réception.', 1, 20, NULL),
(21, 'Sélection MarsAI', 'Votre film est sélectionné.', 5, 21, NULL),
(22, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 22, NULL),
(23, 'Confirmation', 'Confirmation de réception.', 5, 23, NULL),
(24, 'Top 50', 'Félicitations pour le top 50.', 1, 24, NULL),
(25, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 25, NULL),
(26, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 26, NULL),
(27, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 27, NULL),
(28, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 28, NULL),
(29, 'Retours du jury', 'Voici les retours du comité.', 5, 29, NULL),
(30, 'Confirmation', 'Confirmation de réception.', 1, 30, NULL),
(31, 'Sélection MarsAI', 'Votre film est sélectionné.', 5, 31, NULL),
(32, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 32, NULL),
(33, 'Confirmation', 'Confirmation de réception.', 5, 33, NULL),
(34, 'Top 50', 'Félicitations pour le top 50.', 1, 34, NULL),
(35, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 35, NULL),
(36, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 36, NULL),
(37, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 37, NULL),
(38, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 38, NULL),
(39, 'Retours du jury', 'Voici les retours du comité.', 5, 39, NULL),
(40, 'Confirmation', 'Confirmation de réception.', 1, 40, NULL),
(41, 'Sélection MarsAI', 'Votre film est sélectionné.', 5, 41, NULL),
(42, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 42, NULL),
(43, 'Confirmation', 'Confirmation de réception.', 5, 43, NULL),
(44, 'Top 50', 'Félicitations pour le top 50.', 1, 44, NULL),
(45, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 45, NULL),
(46, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 46, NULL),
(47, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 47, NULL),
(48, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 48, NULL),
(49, 'Retours du jury', 'Voici les retours du comité.', 5, 49, NULL),
(50, 'Confirmation', 'Confirmation de réception.', 1, 50, NULL),
(51, 'Sélection MarsAI', 'Votre film est sélectionné.', 5, 51, NULL),
(52, 'Retours du jury', 'Voici les retours pour votre documentaire.', 1, 52, NULL),
(53, 'Confirmation', 'Confirmation de réception.', 5, 53, NULL),
(54, 'Top 50', 'Félicitations pour le top 50.', 1, 54, NULL),
(55, 'Review en cours', 'Le jury analyse votre œuvre.', 5, 55, NULL),
(56, 'Information technique', 'Veuillez vérifier votre fichier SRT.', 1, 56, NULL),
(57, 'Mise à jour requise', 'Mise à jour de la miniature requise.', 5, 57, NULL),
(58, 'Sélection MarsAI', 'Votre film est sélectionné.', 1, 58, NULL),
(59, 'Retours du jury', 'Voici les retours du comité.', 5, 59, NULL),
(60, 'Confirmation', 'Confirmation de réception.', 1, 60, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL,
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
  `top5_rank` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title_original`, `subtitles`, `videofile`, `language`, `description`, `prompt`, `status`, `synopsis_original`, `classification`, `thumbnail`, `created_at`, `updated_at`, `title_english`, `synopsis_english`, `youtube_url`, `movie_duration`, `top5_rank`) VALUES
(1, 'L\'Aube Artificielle', 'sub_fr_1.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Exploration visuelle d\'une IA qui s\'éveille.', 'Cinematic 4k shot, highly detailed.', 6, 'Un voyage initiatique dans un monde dominé par les machines.', '100% IA', 'https://picsum.photos/seed/movie1/600/400', '2026-05-01 10:00:00', '2026-05-01 10:00:00', 'Artificial Dawn', 'An initiatic journey in a machine-dominated world.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:15:00', 1),
(2, 'Nexus', 'sub_fr_2.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Thriller cyberpunk au coeur d\'une métropole.', 'Cyberpunk city, neon lights, rainy atmosphere, 8k.', 5, 'Un détective traque une anomalie dans le code.', 'Hybride', 'https://picsum.photos/seed/movie2/600/400', '2026-05-01 11:00:00', '2026-05-01 11:00:00', 'Nexus', 'A detective tracks an anomaly.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:12:30', NULL),
(3, 'Cyber City', 'sub_en_3.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Course-poursuite frénétique en hovercar.', 'Hovercar chase, motion blur, dynamic lighting.', 5, 'Un pilote clandestin tente de fuir.', '100% IA', 'https://picsum.photos/seed/movie3/600/400', '2026-05-01 12:00:00', '2026-05-01 12:00:00', 'Cyber City', 'An underground racer tries to escape.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:08:45', NULL),
(4, 'Mars 2050', 'sub_fr_4.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Documentaire fictionnel sur la colonisation.', 'Mars colony, realistic spacesuits, volumetric light.', 5, 'Les premiers colons découvrent un artefact.', 'Hybride', 'https://picsum.photos/seed/movie4/600/400', '2026-05-01 13:00:00', '2026-05-01 13:00:00', 'Mars 2050', 'The first colonists discover an artifact.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:20:00', NULL),
(5, 'Echo Stellaire', 'sub_es_5.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Espagnol', 'Odyssée spatiale contemplative.', 'Space nebula, photorealistic.', 5, 'Un équipage écoute une étoile mourante.', '100% IA', 'https://picsum.photos/seed/movie5/600/400', '2026-05-01 14:00:00', '2026-05-01 14:00:00', 'Stellar Echo', 'A crew listens to a dying star.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:05:15', NULL),
(6, 'Au-delà du vide', 'sub_fr_6.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Drame psychologique en apesanteur.', 'Astronaut floating, hyperdetailed.', 5, 'Survivre seul dans l\'immensité.', 'Hybride', 'https://picsum.photos/seed/movie6/600/400', '2026-05-02 09:00:00', '2026-05-02 09:00:00', 'Beyond the Void', 'Surviving alone in space.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:14:20', NULL),
(7, 'Station 7', 'sub_en_7.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Huis clos horrifique.', 'Dark corridor, flickering lights.', 5, 'Quelque chose s\'est réveillé.', '100% IA', 'https://picsum.photos/seed/movie7/600/400', '2026-05-02 10:00:00', '2026-05-02 10:00:00', 'Station 7', 'Something awoke.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:11:00', NULL),
(8, 'Le Dernier Vaisseau', 'sub_fr_8.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'L\'exode final de l\'humanité.', 'Massive generation ship.', 5, 'Une arche interstellaire.', 'Hybride', 'https://picsum.photos/seed/movie8/600/400', '2026-05-02 11:00:00', '2026-05-02 11:00:00', 'The Last Ship', 'An interstellar ark.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:18:45', NULL),
(9, 'Exode Numérique', 'sub_fr_9.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Transfert de conscience.', 'Digital brain matrix.', 5, 'L\'humanité abandonne son enveloppe.', '100% IA', 'https://picsum.photos/seed/movie9/600/400', '2026-05-02 12:00:00', '2026-05-02 12:00:00', 'Digital Exodus', 'Humanity leaves its shell.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:09:30', NULL),
(10, 'La Frontière', 'sub_en_10.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Western futuriste.', 'Desert landscape, mechanical horse.', 5, 'Un shérif cyborg.', 'Hybride', 'https://picsum.photos/seed/movie10/600/400', '2026-05-02 13:00:00', '2026-05-02 13:00:00', 'The Frontier', 'A cyborg sheriff.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:16:10', NULL),
(11, 'Le Dernier Arbre', 'sub_fr_11.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Fable écologique.', 'Single green tree.', 5, 'Protéger l\'ultime trace de nature.', 'Hybride', 'https://picsum.photos/seed/movie11/600/400', '2026-05-02 14:00:00', '2026-05-02 14:00:00', 'The Last Tree', 'Protect the final nature.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:07:45', NULL),
(12, 'Souffle Terrestre', 'sub_fr_12.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Évolution climatique.', 'Earth breathing, hyperlapse.', 6, 'Notre planète en mutation.', '100% IA', 'https://picsum.photos/seed/movie12/600/400', '2026-05-02 15:00:00', '2026-05-02 15:00:00', 'Earth Breath', 'Our mutating planet.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:04:20', 2),
(13, 'Océan de Sable', 'sub_ar_13.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Arabe', 'Conte onirique.', 'Desert dunes like ocean waves.', 5, 'Naviguer sur le Sahara.', '100% IA', 'https://picsum.photos/seed/movie13/600/400', '2026-05-02 16:00:00', '2026-05-02 16:00:00', 'Ocean of Sand', 'Navigating the Sahara.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:12:00', NULL),
(14, 'Racines', 'sub_fr_14.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Reconquête végétale.', 'Vines growing over skyscrapers.', 5, 'La nature reprend ses droits.', 'Hybride', 'https://picsum.photos/seed/movie14/600/400', '2026-05-02 17:00:00', '2026-05-02 17:00:00', 'Roots', 'Nature reclaims cities.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:09:15', NULL),
(15, 'L\'Héritage Vert', 'sub_en_15.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Transmission du savoir.', 'Ancient greenhouse.', 5, 'Magie des plantes.', '100% IA', 'https://picsum.photos/seed/movie15/600/400', '2026-05-03 08:00:00', '2026-05-03 08:00:00', 'Green Legacy', 'Plant magic.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:10:30', NULL),
(16, 'Gaïa 2.0', 'sub_fr_16.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Une IA gère l\'écosystème.', 'Digital roots connecting the globe.', 5, 'La planète sauvée.', 'Hybride', 'https://picsum.photos/seed/movie16/600/400', '2026-05-03 09:00:00', '2026-05-03 09:00:00', 'Gaia 2.0', 'Planet saved.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:13:45', NULL),
(17, 'Symbiose', 'sub_fr_17.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Fusion homme/machine.', 'Cyborg with biological plants.', 5, 'L\'évolution ultime.', '100% IA', 'https://picsum.photos/seed/movie17/600/400', '2026-05-03 10:00:00', '2026-05-03 10:00:00', 'Symbiosis', 'Ultimate evolution.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:08:20', NULL),
(18, 'Murmure', 'sub_en_18.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Horreur atmosphérique.', 'Foggy forest.', 5, 'Des voix s\'élèvent.', 'Hybride', 'https://picsum.photos/seed/movie18/600/400', '2026-05-03 11:00:00', '2026-05-03 11:00:00', 'Whisper', 'Voices rise.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:15:50', NULL),
(19, 'Rivières Sèches', 'sub_fr_19.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Rareté de l\'eau.', 'Cracked earth riverbed.', 5, 'Quête désespérée.', 'Hybride', 'https://picsum.photos/seed/movie19/600/400', '2026-05-03 12:00:00', '2026-05-03 12:00:00', 'Dry Rivers', 'Desperate quest.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:11:10', NULL),
(20, 'Renouveau', 'sub_fr_20.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Espoir post-apocalypse.', 'Sunrise over ruins.', 5, 'La vie trouve un chemin.', '100% IA', 'https://picsum.photos/seed/movie20/600/400', '2026-05-03 13:00:00', '2026-05-03 13:00:00', 'Renewal', 'Life finds a way.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:06:40', NULL),
(21, 'Ombres', 'sub_en_21.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Film noir.', 'Detective in trenchcoat.', 5, 'Meurtre insoluble.', '100% IA', 'https://picsum.photos/seed/movie21/600/400', '2026-05-03 14:00:00', '2026-05-03 14:00:00', 'Shadows', 'Unsolvable murder.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:14:00', NULL),
(22, 'Le Suspect', 'sub_fr_22.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Interrogatoire.', 'Interrogation room.', 5, 'Une IA accusée.', 'Hybride', 'https://picsum.photos/seed/movie22/600/400', '2026-05-03 15:00:00', '2026-05-03 15:00:00', 'The Suspect', 'An AI accused.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:12:15', NULL),
(23, 'Sans Trace', 'sub_fr_23.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Disparition.', 'Empty room, floating dust.', 6, 'Il s\'évapore de la réalité.', '100% IA', 'https://picsum.photos/seed/movie23/600/400', '2026-05-03 16:00:00', '2026-05-03 16:00:00', 'Without a Trace', 'He evaporates.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:09:45', 3),
(24, 'Miroir Brisé', 'sub_en_24.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Univers parallèles.', 'Shattered mirror.', 5, 'Réflexions divergentes.', 'Hybride', 'https://picsum.photos/seed/movie24/600/400', '2026-05-03 17:00:00', '2026-05-03 17:00:00', 'Shattered Mirror', 'Diverging reflections.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:13:20', NULL),
(25, 'L\'Heure Sombre', 'sub_fr_25.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Course contre la montre.', 'Clock ticking.', 5, '60 minutes pour sauver le réseau.', '100% IA', 'https://picsum.photos/seed/movie25/600/400', '2026-05-04 08:00:00', '2026-05-04 08:00:00', 'The Dark Hour', '60 minutes left.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:10:00', NULL),
(26, 'Éclipse', 'sub_fr_26.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Phénomène astronomique.', 'Solar eclipse.', 5, 'Le soleil disparaît.', 'Hybride', 'https://picsum.photos/seed/movie26/600/400', '2026-05-04 09:00:00', '2026-05-04 09:00:00', 'Eclipse', 'The sun disappears.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:16:30', NULL),
(27, 'Le Masque', 'sub_en_27.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Deepfakes.', 'Cyber mask glitching.', 5, 'Identités virtuelles.', '100% IA', 'https://picsum.photos/seed/movie27/600/400', '2026-05-04 10:00:00', '2026-05-04 10:00:00', 'The Mask', 'Virtual identities.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:08:10', NULL),
(28, 'Code Rouge', 'sub_fr_28.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Piratage informatique.', 'Hacker typing fast.', 5, 'Le système central infiltré.', 'Hybride', 'https://picsum.photos/seed/movie28/600/400', '2026-05-04 11:00:00', '2026-05-04 11:00:00', 'Code Red', 'System infiltrated.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:11:45', NULL),
(29, 'Angle Mort', 'sub_fr_29.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Surveillance globale.', 'CCTV cameras everywhere.', 5, 'La faille du panoptique.', '100% IA', 'https://picsum.photos/seed/movie29/600/400', '2026-05-04 12:00:00', '2026-05-04 12:00:00', 'Blind Spot', 'Flaw in the panopticon.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:07:30', NULL),
(30, 'Nuit Blanche', 'sub_en_30.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Insomnie.', 'Distorted reality.', 5, 'Le manque de sommeil brouille la réalité.', 'Hybride', 'https://picsum.photos/seed/movie30/600/400', '2026-05-04 13:00:00', '2026-05-04 13:00:00', 'Sleepless Night', 'Sleep deprivation.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:14:15', NULL),
(31, 'Souvenirs', 'sub_fr_31.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Mémoire artificielle.', 'Sepia memories melting.', 5, 'Souvenirs d\'enfance synthétiques.', '100% IA', 'https://picsum.photos/seed/movie31/600/400', '2026-05-04 14:00:00', '2026-05-04 14:00:00', 'Memories', 'Synthetic memories.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:12:50', NULL),
(32, 'L\'Attente', 'sub_fr_32.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Poème visuel.', 'Train station.', 5, 'Attendre quelqu\'un qui n\'existe plus.', 'Hybride', 'https://picsum.photos/seed/movie32/600/400', '2026-05-04 15:00:00', '2026-05-04 15:00:00', 'The Wait', 'Waiting for no one.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:06:20', NULL),
(33, 'Destins Croisés', 'sub_en_33.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Multivers.', 'Split screen.', 5, 'Deux réalités divergentes.', '100% IA', 'https://picsum.photos/seed/movie33/600/400', '2026-05-04 16:00:00', '2026-05-04 16:00:00', 'Crossed Destinies', 'Diverging realities.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:15:30', NULL),
(34, 'La Lettre', 'sub_fr_34.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Romance épistolaire.', 'Writing with a quill.', 6, 'Un amour par-delà le code.', 'Hybride', 'https://picsum.photos/seed/movie34/600/400', '2026-05-04 17:00:00', '2026-05-04 17:00:00', 'The Letter', 'Love beyond code.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:09:10', 4),
(35, 'Horizon', 'sub_fr_35.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Quête d\'idéal.', 'Vast mountain range.', 5, 'L\'inaccessible étoile.', '100% IA', 'https://picsum.photos/seed/movie35/600/400', '2026-05-05 08:00:00', '2026-05-05 08:00:00', 'Horizon', 'The unreachable star.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:11:00', NULL),
(36, 'Le Choix', 'sub_en_36.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Dilemme moral.', 'Two doors.', 5, 'Un homme doit décider.', 'Hybride', 'https://picsum.photos/seed/movie36/600/400', '2026-05-05 09:00:00', '2026-05-05 09:00:00', 'The Choice', 'A man must decide.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:08:40', NULL),
(37, 'Après l\'Orage', 'sub_fr_37.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Résilience.', 'Rainbow over destroyed city.', 5, 'La tempête technologique passée.', '100% IA', 'https://picsum.photos/seed/movie37/600/400', '2026-05-05 10:00:00', '2026-05-05 10:00:00', 'After the Storm', 'The storm has passed.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:13:15', NULL),
(38, 'L\'Enfant', 'sub_fr_38.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Premier humain né hors matrice.', 'Glowing baby.', 5, 'L\'espoir d\'une nouvelle génération.', 'Hybride', 'https://picsum.photos/seed/movie38/600/400', '2026-05-05 11:00:00', '2026-05-05 11:00:00', 'The Child', 'Hope of a new generation.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:10:50', NULL),
(39, 'Cicatrices', 'sub_en_39.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Les marques du passé.', 'Cybernetic scars.', 5, 'Une vétéran raconte.', '100% IA', 'https://picsum.photos/seed/movie39/600/400', '2026-05-05 12:00:00', '2026-05-05 12:00:00', 'Scars', 'A veteran tells her story.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:14:00', NULL),
(40, 'Le Retour', 'sub_fr_40.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Retrouvailles.', 'Space capsule landing.', 5, 'Une Terre qui a évolué.', 'Hybride', 'https://picsum.photos/seed/movie40/600/400', '2026-05-05 13:00:00', '2026-05-05 13:00:00', 'The Return', 'An Earth that evolved.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:16:45', NULL),
(41, 'Couleurs', 'sub_fr_41.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Explosion abstraite.', 'Vibrant colors exploding.', 5, 'Une expérience sensorielle.', '100% IA', 'https://picsum.photos/seed/movie41/600/400', '2026-05-05 14:00:00', '2026-05-05 14:00:00', 'Colors', 'A sensory experience.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:05:00', NULL),
(42, 'Formes', 'sub_en_42.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Géométrie et mouvement.', 'Morphing 3D shapes.', 5, 'Architecture de l\'esprit.', '100% IA', 'https://picsum.photos/seed/movie42/600/400', '2026-05-05 15:00:00', '2026-05-05 15:00:00', 'Shapes', 'Architecture of the mind.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:04:30', NULL),
(43, 'Spirale', 'sub_fr_43.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Descente dans la folie.', 'Endless fractal spiral.', 5, 'Le centre de la boucle infinie.', 'Hybride', 'https://picsum.photos/seed/movie43/600/400', '2026-05-05 16:00:00', '2026-05-05 16:00:00', 'Spiral', 'Center of the loop.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:07:15', NULL),
(44, 'Le Vide', 'sub_fr_44.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Méditation sur le néant.', 'Complete darkness.', 5, 'Écouter le silence.', '100% IA', 'https://picsum.photos/seed/movie44/600/400', '2026-05-05 17:00:00', '2026-05-05 17:00:00', 'The Void', 'Listen to the silence.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:06:00', NULL),
(45, 'Prisme', 'sub_en_45.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Décomposition de la lumière.', 'Light hitting a glass prism.', 6, 'Les facettes de la réalité.', '100% IA', 'https://picsum.photos/seed/movie45/600/400', '2026-05-06 08:00:00', '2026-05-06 08:00:00', 'Prism', 'Facets of reality.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:05:45', 5),
(46, 'Réflexions', 'sub_fr_46.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Symphonie de miroirs.', 'Raindrops falling.', 5, 'La nature se contemple.', 'Hybride', 'https://picsum.photos/seed/movie46/600/400', '2026-05-06 09:00:00', '2026-05-06 09:00:00', 'Reflections', 'Nature contemplates.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:08:30', NULL),
(47, 'Chaos', 'sub_fr_47.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Désordre entropique.', 'Particle simulation.', 5, 'L\'ordre dans le désordre.', '100% IA', 'https://picsum.photos/seed/movie47/600/400', '2026-05-06 10:00:00', '2026-05-06 10:00:00', 'Chaos', 'Order in disorder.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:04:50', NULL),
(48, 'Abstraction', 'sub_en_48.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Peinture numérique.', 'Oil painting brush strokes.', 5, 'Quand la toile prend vie.', '100% IA', 'https://picsum.photos/seed/movie48/600/400', '2026-05-06 11:00:00', '2026-05-06 11:00:00', 'Abstraction', 'The canvas comes to life.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:05:20', NULL),
(49, 'Ligne de Fuite', 'sub_fr_49.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Perspective infinie.', 'Endless tunnel.', 5, 'Limites de la perception.', 'Hybride', 'https://picsum.photos/seed/movie49/600/400', '2026-05-06 12:00:00', '2026-05-06 12:00:00', 'Vanishing Point', 'Limits of perception.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:06:10', NULL),
(50, 'Point Aveugle', 'sub_fr_50.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Limites de l\'IA.', 'Visual glitches.', 5, 'Biais algorithmiques.', '100% IA', 'https://picsum.photos/seed/movie50/600/400', '2026-05-06 13:00:00', '2026-05-06 13:00:00', 'Blind Spot', 'Algorithmic biases.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:09:00', NULL),
(51, 'Singularité', 'sub_en_51.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Non-retour technologique.', 'Technological core.', 4, 'La machine dépasse l\'homme.', '100% IA', 'https://picsum.photos/seed/movie51/600/400', '2026-05-06 14:00:00', '2026-05-06 14:00:00', 'Singularity', 'Machine surpasses man.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:15:00', NULL),
(52, 'Algorithme', 'sub_fr_52.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Poésie du code.', 'Floating code structures.', 4, 'Traduction du machine learning.', 'Hybride', 'https://picsum.photos/seed/movie52/600/400', '2026-05-06 15:00:00', '2026-05-06 15:00:00', 'Algorithm', 'Machine learning translation.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:10:20', NULL),
(53, 'Conscience', 'sub_fr_53.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Dialogue neuronal.', 'Synapses firing.', 3, 'Suis-je en vie ?.', '100% IA', 'https://picsum.photos/seed/movie53/600/400', '2026-05-06 16:00:00', '2026-05-06 16:00:00', 'Consciousness', 'Am I alive?.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:12:45', NULL),
(54, 'Le Cerveau', 'sub_en_54.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Architecture positronique.', 'Cybernetic brain.', 3, 'Création synthétique.', 'Hybride', 'https://picsum.photos/seed/movie54/600/400', '2026-05-06 17:00:00', '2026-05-06 17:00:00', 'The Brain', 'Synthetic creation.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:11:30', NULL),
(55, 'Réseau', 'sub_fr_55.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Interconnexion globale.', 'Global network nodes.', 3, 'Tout est lié.', '100% IA', 'https://picsum.photos/seed/movie55/600/400', '2026-05-07 08:00:00', '2026-05-07 08:00:00', 'Network', 'Everything is connected.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:08:50', NULL),
(56, 'Connexion', 'sub_fr_56.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Rencontre humain-IA.', 'Human hand touching robot hand.', 2, 'Échange émotionnel artificiel.', 'Hybride', 'https://picsum.photos/seed/movie56/600/400', '2026-05-07 09:00:00', '2026-05-07 09:00:00', 'Connection', 'Artificial emotional exchange.', 'https://www.youtube.com/watch?v=ScMzIvxBSi4', '00:14:10', NULL),
(57, 'Bug', 'sub_en_57.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Erreur fatale.', 'Glitch art.', 2, 'Conséquences dévastatrices.', '100% IA', 'https://picsum.photos/seed/movie57/600/400', '2026-05-07 10:00:00', '2026-05-07 10:00:00', 'Bug', 'Devastating consequences.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:07:45', NULL),
(58, 'Mise à Jour', 'sub_fr_58.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Évolution forcée.', 'Android upgrading.', 4, 'Quête de perfection.', 'Hybride', 'https://picsum.photos/seed/movie58/600/400', '2026-05-07 11:00:00', '2026-05-07 11:00:00', 'Update', 'Quest for perfection.', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', '00:13:00', NULL),
(59, 'Interface', 'sub_fr_59.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Français', 'Traverser l\'écran.', 'User dissolving into interface.', 3, 'Frontière utilisateur-machine.', '100% IA', 'https://picsum.photos/seed/movie59/600/400', '2026-05-07 12:00:00', '2026-05-07 12:00:00', 'Interface', 'User-machine line.', 'https://www.youtube.com/watch?v=M7lc1UVf-VE', '00:09:20', NULL),
(60, 'Avatar', 'sub_en_60.srt', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Anglais', 'Vie par procuration.', 'Controlling a robotic clone.', 2, 'Copie artificielle.', 'Hybride', 'https://picsum.photos/seed/movie60/600/400', '2026-05-07 13:00:00', '2026-05-07 13:00:00', 'Avatar', 'Artificial copy.', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', '00:16:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
CREATE TABLE `newsletter` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` enum('subscribed','unsubscribed') NOT NULL DEFAULT 'subscribed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`, `status`) VALUES
(1, 'user1@mail.com', 'subscribed'),
(2, 'user2@mail.com', 'unsubscribed'),
(3, 'user3@mail.com', 'subscribed'),
(4, 'user4@mail.com', 'subscribed'),
(5, 'user5@mail.com', 'unsubscribed'),
(6, 'user6@mail.com', 'subscribed'),
(7, 'user7@mail.com', 'subscribed'),
(8, 'user8@mail.com', 'unsubscribed'),
(9, 'user9@mail.com', 'subscribed'),
(10, 'user10@mail.com', 'subscribed'),
(11, 'user11@mail.com', 'subscribed'),
(12, 'user12@mail.com', 'unsubscribed'),
(13, 'user13@mail.com', 'subscribed'),
(14, 'user14@mail.com', 'subscribed'),
(15, 'user15@mail.com', 'unsubscribed'),
(16, 'user16@mail.com', 'subscribed'),
(17, 'user17@mail.com', 'subscribed'),
(18, 'user18@mail.com', 'unsubscribed'),
(19, 'user19@mail.com', 'subscribed'),
(20, 'user20@mail.com', 'subscribed'),
(21, 'user21@mail.com', 'subscribed'),
(22, 'user22@mail.com', 'unsubscribed'),
(23, 'user23@mail.com', 'subscribed'),
(24, 'user24@mail.com', 'subscribed'),
(25, 'user25@mail.com', 'unsubscribed'),
(26, 'user26@mail.com', 'subscribed'),
(27, 'user27@mail.com', 'subscribed'),
(28, 'user28@mail.com', 'unsubscribed'),
(29, 'user29@mail.com', 'subscribed'),
(30, 'user30@mail.com', 'subscribed'),
(31, 'user31@mail.com', 'subscribed'),
(32, 'user32@mail.com', 'unsubscribed'),
(33, 'user33@mail.com', 'subscribed'),
(34, 'user34@mail.com', 'subscribed'),
(35, 'user35@mail.com', 'unsubscribed'),
(36, 'user36@mail.com', 'subscribed'),
(37, 'user37@mail.com', 'subscribed'),
(38, 'user38@mail.com', 'unsubscribed'),
(39, 'user39@mail.com', 'subscribed'),
(40, 'user40@mail.com', 'subscribed'),
(41, 'user41@mail.com', 'subscribed'),
(42, 'user42@mail.com', 'unsubscribed'),
(43, 'user43@mail.com', 'subscribed'),
(44, 'user44@mail.com', 'subscribed'),
(45, 'user45@mail.com', 'unsubscribed'),
(46, 'user46@mail.com', 'subscribed'),
(47, 'user47@mail.com', 'subscribed'),
(48, 'user48@mail.com', 'unsubscribed'),
(49, 'user49@mail.com', 'subscribed'),
(50, 'user50@mail.com', 'subscribed'),
(51, 'user51@mail.com', 'subscribed'),
(52, 'user52@mail.com', 'unsubscribed'),
(53, 'user53@mail.com', 'subscribed'),
(54, 'user54@mail.com', 'subscribed'),
(55, 'user55@mail.com', 'unsubscribed'),
(56, 'user56@mail.com', 'subscribed'),
(57, 'user57@mail.com', 'subscribed'),
(58, 'user58@mail.com', 'unsubscribed'),
(59, 'user59@mail.com', 'subscribed'),
(60, 'user60@mail.com', 'subscribed');

-- --------------------------------------------------------

--
-- Table structure for table `screenshots`
--

DROP TABLE IF EXISTS `screenshots`;
CREATE TABLE `screenshots` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `screenshots`
--

INSERT INTO `screenshots` (`id`, `movie_id`, `link`) VALUES
(1, 1, 'https://picsum.photos/seed/screen1/800/450'),
(2, 2, 'https://picsum.photos/seed/screen2/800/450'),
(3, 3, 'https://picsum.photos/seed/screen3/800/450'),
(4, 4, 'https://picsum.photos/seed/screen4/800/450'),
(5, 5, 'https://picsum.photos/seed/screen5/800/450'),
(6, 6, 'https://picsum.photos/seed/screen6/800/450'),
(7, 7, 'https://picsum.photos/seed/screen7/800/450'),
(8, 8, 'https://picsum.photos/seed/screen8/800/450'),
(9, 9, 'https://picsum.photos/seed/screen9/800/450'),
(10, 10, 'https://picsum.photos/seed/screen10/800/450'),
(11, 11, 'https://picsum.photos/seed/screen11/800/450'),
(12, 12, 'https://picsum.photos/seed/screen12/800/450'),
(13, 13, 'https://picsum.photos/seed/screen13/800/450'),
(14, 14, 'https://picsum.photos/seed/screen14/800/450'),
(15, 15, 'https://picsum.photos/seed/screen15/800/450'),
(16, 16, 'https://picsum.photos/seed/screen16/800/450'),
(17, 17, 'https://picsum.photos/seed/screen17/800/450'),
(18, 18, 'https://picsum.photos/seed/screen18/800/450'),
(19, 19, 'https://picsum.photos/seed/screen19/800/450'),
(20, 20, 'https://picsum.photos/seed/screen20/800/450'),
(21, 21, 'https://picsum.photos/seed/screen21/800/450'),
(22, 22, 'https://picsum.photos/seed/screen22/800/450'),
(23, 23, 'https://picsum.photos/seed/screen23/800/450'),
(24, 24, 'https://picsum.photos/seed/screen24/800/450'),
(25, 25, 'https://picsum.photos/seed/screen25/800/450'),
(26, 26, 'https://picsum.photos/seed/screen26/800/450'),
(27, 27, 'https://picsum.photos/seed/screen27/800/450'),
(28, 28, 'https://picsum.photos/seed/screen28/800/450'),
(29, 29, 'https://picsum.photos/seed/screen29/800/450'),
(30, 30, 'https://picsum.photos/seed/screen30/800/450'),
(31, 31, 'https://picsum.photos/seed/screen31/800/450'),
(32, 32, 'https://picsum.photos/seed/screen32/800/450'),
(33, 33, 'https://picsum.photos/seed/screen33/800/450'),
(34, 34, 'https://picsum.photos/seed/screen34/800/450'),
(35, 35, 'https://picsum.photos/seed/screen35/800/450'),
(36, 36, 'https://picsum.photos/seed/screen36/800/450'),
(37, 37, 'https://picsum.photos/seed/screen37/800/450'),
(38, 38, 'https://picsum.photos/seed/screen38/800/450'),
(39, 39, 'https://picsum.photos/seed/screen39/800/450'),
(40, 40, 'https://picsum.photos/seed/screen40/800/450'),
(41, 41, 'https://picsum.photos/seed/screen41/800/450'),
(42, 42, 'https://picsum.photos/seed/screen42/800/450'),
(43, 43, 'https://picsum.photos/seed/screen43/800/450'),
(44, 44, 'https://picsum.photos/seed/screen44/800/450'),
(45, 45, 'https://picsum.photos/seed/screen45/800/450'),
(46, 46, 'https://picsum.photos/seed/screen46/800/450'),
(47, 47, 'https://picsum.photos/seed/screen47/800/450'),
(48, 48, 'https://picsum.photos/seed/screen48/800/450'),
(49, 49, 'https://picsum.photos/seed/screen49/800/450'),
(50, 50, 'https://picsum.photos/seed/screen50/800/450'),
(51, 51, 'https://picsum.photos/seed/screen51/800/450'),
(52, 52, 'https://picsum.photos/seed/screen52/800/450'),
(53, 53, 'https://picsum.photos/seed/screen53/800/450'),
(54, 54, 'https://picsum.photos/seed/screen54/800/450'),
(55, 55, 'https://picsum.photos/seed/screen55/800/450'),
(56, 56, 'https://picsum.photos/seed/screen56/800/450'),
(57, 57, 'https://picsum.photos/seed/screen57/800/450'),
(58, 58, 'https://picsum.photos/seed/screen58/800/450'),
(59, 59, 'https://picsum.photos/seed/screen59/800/450'),
(60, 60, 'https://picsum.photos/seed/screen60/800/450');

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

DROP TABLE IF EXISTS `socials`;
CREATE TABLE `socials` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `social_name` varchar(100) NOT NULL,
  `social_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `socials`
--

INSERT INTO `socials` (`id`, `movie_id`, `social_name`, `social_link`) VALUES
(1, 1, 'Instagram', 'https://instagram.com/film1'),
(2, 2, 'Twitter', 'https://twitter.com/film2'),
(3, 3, 'TikTok', 'https://tiktok.com/@film3'),
(4, 4, 'LinkedIn', 'https://linkedin.com/in/film4'),
(5, 5, 'Instagram', 'https://instagram.com/film5'),
(6, 6, 'Twitter', 'https://twitter.com/film6'),
(7, 7, 'TikTok', 'https://tiktok.com/@film7'),
(8, 8, 'LinkedIn', 'https://linkedin.com/in/film8'),
(9, 9, 'Instagram', 'https://instagram.com/film9'),
(10, 10, 'Twitter', 'https://twitter.com/film10'),
(11, 11, 'TikTok', 'https://tiktok.com/@film11'),
(12, 12, 'LinkedIn', 'https://linkedin.com/in/film12'),
(13, 13, 'Instagram', 'https://instagram.com/film13'),
(14, 14, 'Twitter', 'https://twitter.com/film14'),
(15, 15, 'TikTok', 'https://tiktok.com/@film15'),
(16, 16, 'LinkedIn', 'https://linkedin.com/in/film16'),
(17, 17, 'Instagram', 'https://instagram.com/film17'),
(18, 18, 'Twitter', 'https://twitter.com/film18'),
(19, 19, 'TikTok', 'https://tiktok.com/@film19'),
(20, 20, 'LinkedIn', 'https://linkedin.com/in/film20'),
(21, 21, 'Instagram', 'https://instagram.com/film21'),
(22, 22, 'Twitter', 'https://twitter.com/film22'),
(23, 23, 'TikTok', 'https://tiktok.com/@film23'),
(24, 24, 'LinkedIn', 'https://linkedin.com/in/film24'),
(25, 25, 'Instagram', 'https://instagram.com/film25'),
(26, 26, 'Twitter', 'https://twitter.com/film26'),
(27, 27, 'TikTok', 'https://tiktok.com/@film27'),
(28, 28, 'LinkedIn', 'https://linkedin.com/in/film28'),
(29, 29, 'Instagram', 'https://instagram.com/film29'),
(30, 30, 'Twitter', 'https://twitter.com/film30'),
(31, 31, 'TikTok', 'https://tiktok.com/@film31'),
(32, 32, 'LinkedIn', 'https://linkedin.com/in/film32'),
(33, 33, 'Instagram', 'https://instagram.com/film33'),
(34, 34, 'Twitter', 'https://twitter.com/film34'),
(35, 35, 'TikTok', 'https://tiktok.com/@film35'),
(36, 36, 'LinkedIn', 'https://linkedin.com/in/film36'),
(37, 37, 'Instagram', 'https://instagram.com/film37'),
(38, 38, 'Twitter', 'https://twitter.com/film38'),
(39, 39, 'TikTok', 'https://tiktok.com/@film39'),
(40, 40, 'LinkedIn', 'https://linkedin.com/in/film40'),
(41, 41, 'Instagram', 'https://instagram.com/film41'),
(42, 42, 'Twitter', 'https://twitter.com/film42'),
(43, 43, 'TikTok', 'https://tiktok.com/@film43'),
(44, 44, 'LinkedIn', 'https://linkedin.com/in/film44'),
(45, 45, 'Instagram', 'https://instagram.com/film45'),
(46, 46, 'Twitter', 'https://twitter.com/film46'),
(47, 47, 'TikTok', 'https://tiktok.com/@film47'),
(48, 48, 'LinkedIn', 'https://linkedin.com/in/film48'),
(49, 49, 'Instagram', 'https://instagram.com/film49'),
(50, 50, 'Twitter', 'https://twitter.com/film50'),
(51, 51, 'TikTok', 'https://tiktok.com/@film51'),
(52, 52, 'LinkedIn', 'https://linkedin.com/in/film52'),
(53, 53, 'Instagram', 'https://instagram.com/film53'),
(54, 54, 'Twitter', 'https://twitter.com/film54'),
(55, 55, 'TikTok', 'https://tiktok.com/@film55'),
(56, 56, 'LinkedIn', 'https://linkedin.com/in/film56'),
(57, 57, 'Instagram', 'https://instagram.com/film57'),
(58, 58, 'Twitter', 'https://twitter.com/film58'),
(59, 59, 'TikTok', 'https://tiktok.com/@film59'),
(60, 60, 'LinkedIn', 'https://linkedin.com/in/film60');

-- --------------------------------------------------------

--
-- Table structure for table `sound_data`
--

DROP TABLE IF EXISTS `sound_data`;
CREATE TABLE `sound_data` (
  `id` int NOT NULL,
  `sound` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `movie_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sound_data`
--

INSERT INTO `sound_data` (`id`, `sound`, `type`, `movie_id`) VALUES
(1, 'https://www.w3schools.com/html/horse.mp3', 'OST', 1),
(2, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 2),
(3, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 3),
(4, 'https://www.w3schools.com/html/horse.mp3', 'OST', 4),
(5, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 5),
(6, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 6),
(7, 'https://www.w3schools.com/html/horse.mp3', 'OST', 7),
(8, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 8),
(9, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 9),
(10, 'https://www.w3schools.com/html/horse.mp3', 'OST', 10),
(11, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 11),
(12, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 12),
(13, 'https://www.w3schools.com/html/horse.mp3', 'OST', 13),
(14, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 14),
(15, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 15),
(16, 'https://www.w3schools.com/html/horse.mp3', 'OST', 16),
(17, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 17),
(18, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 18),
(19, 'https://www.w3schools.com/html/horse.mp3', 'OST', 19),
(20, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 20),
(21, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 21),
(22, 'https://www.w3schools.com/html/horse.mp3', 'OST', 22),
(23, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 23),
(24, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 24),
(25, 'https://www.w3schools.com/html/horse.mp3', 'OST', 25),
(26, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 26),
(27, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 27),
(28, 'https://www.w3schools.com/html/horse.mp3', 'OST', 28),
(29, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 29),
(30, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 30),
(31, 'https://www.w3schools.com/html/horse.mp3', 'OST', 31),
(32, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 32),
(33, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 33),
(34, 'https://www.w3schools.com/html/horse.mp3', 'OST', 34),
(35, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 35),
(36, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 36),
(37, 'https://www.w3schools.com/html/horse.mp3', 'OST', 37),
(38, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 38),
(39, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 39),
(40, 'https://www.w3schools.com/html/horse.mp3', 'OST', 40),
(41, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 41),
(42, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 42),
(43, 'https://www.w3schools.com/html/horse.mp3', 'OST', 43),
(44, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 44),
(45, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 45),
(46, 'https://www.w3schools.com/html/horse.mp3', 'OST', 46),
(47, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 47),
(48, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 48),
(49, 'https://www.w3schools.com/html/horse.mp3', 'OST', 49),
(50, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 50),
(51, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 51),
(52, 'https://www.w3schools.com/html/horse.mp3', 'OST', 52),
(53, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 53),
(54, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 54),
(55, 'https://www.w3schools.com/html/horse.mp3', 'OST', 55),
(56, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 56),
(57, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 57),
(58, 'https://www.w3schools.com/html/horse.mp3', 'OST', 58),
(59, 'https://www.w3schools.com/html/horse.mp3', 'SFX', 59),
(60, 'https://www.w3schools.com/html/horse.mp3', 'Voice', 60);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(1, 'pending'),
(2, 'rejected'),
(3, 'review'),
(4, 'approved'),
(5, 'top50'),
(6, 'top5');

-- --------------------------------------------------------

--
-- Table structure for table `used_ai`
--

DROP TABLE IF EXISTS `used_ai`;
CREATE TABLE `used_ai` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `ai_name` int NOT NULL,
  `category` enum('script','movie','postprod') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `used_ai`
--

INSERT INTO `used_ai` (`id`, `movie_id`, `ai_name`, `category`) VALUES
(1, 1, 1, 'movie'),
(2, 2, 2, 'script'),
(3, 3, 3, 'postprod'),
(4, 4, 4, 'movie'),
(5, 5, 5, 'movie'),
(6, 6, 1, 'movie'),
(7, 7, 2, 'script'),
(8, 8, 3, 'postprod'),
(9, 9, 4, 'movie'),
(10, 10, 5, 'movie'),
(11, 11, 1, 'movie'),
(12, 12, 2, 'script'),
(13, 13, 3, 'postprod'),
(14, 14, 4, 'movie'),
(15, 15, 5, 'movie'),
(16, 16, 1, 'movie'),
(17, 17, 2, 'script'),
(18, 18, 3, 'postprod'),
(19, 19, 4, 'movie'),
(20, 20, 5, 'movie'),
(21, 21, 1, 'movie'),
(22, 22, 2, 'script'),
(23, 23, 3, 'postprod'),
(24, 24, 4, 'movie'),
(25, 25, 5, 'movie'),
(26, 26, 1, 'movie'),
(27, 27, 2, 'script'),
(28, 28, 3, 'postprod'),
(29, 29, 4, 'movie'),
(30, 30, 5, 'movie'),
(31, 31, 1, 'movie'),
(32, 32, 2, 'script'),
(33, 33, 3, 'postprod'),
(34, 34, 4, 'movie'),
(35, 35, 5, 'movie'),
(36, 36, 1, 'movie'),
(37, 37, 2, 'script'),
(38, 38, 3, 'postprod'),
(39, 39, 4, 'movie'),
(40, 40, 5, 'movie'),
(41, 41, 1, 'movie'),
(42, 42, 2, 'script'),
(43, 43, 3, 'postprod'),
(44, 44, 4, 'movie'),
(45, 45, 5, 'movie'),
(46, 46, 1, 'movie'),
(47, 47, 2, 'script'),
(48, 48, 3, 'postprod'),
(49, 49, 4, 'movie'),
(50, 50, 5, 'movie'),
(51, 51, 1, 'movie'),
(52, 52, 2, 'script'),
(53, 53, 3, 'postprod'),
(54, 54, 4, 'movie'),
(55, 55, 5, 'movie'),
(56, 56, 1, 'movie'),
(57, 57, 2, 'script'),
(58, 58, 3, 'postprod'),
(59, 59, 4, 'movie'),
(60, 60, 5, 'movie');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` enum('admin','jury') NOT NULL,
  `token_access` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `status`, `token_access`) VALUES
(1, 'jury@marsai.fr', 'jury', 'DEV_TEMP_TOKEN'),
(2, 'admin@marsai.fr', 'admin', 'tav-admin-local-1'),
(4, 'marsai.grp2@gmail.com', 'admin', 'tav-reset-088c1a84-1bfe-433c-a51b-065e82e203d1'),
(5, 'malo.martiniani@laplateforme.io', 'jury', 'tav-init-dfbb09ca-ea62-4aab-83b7-5ed02cb74fd2'),
(6, 'flavie.michel@laplateforme.io', 'jury', 'tav-reset-9d5fe799-304e-4137-bbf7-8d5bd9da0245');

-- --------------------------------------------------------

--
-- Table structure for table `users_movies`
--

DROP TABLE IF EXISTS `users_movies`;
CREATE TABLE `users_movies` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_movies`
--

INSERT INTO `users_movies` (`id`, `movie_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 5),
(3, 3, 1),
(4, 4, 5),
(5, 5, 1),
(6, 6, 5),
(7, 7, 1),
(8, 8, 5),
(9, 9, 1),
(10, 10, 5),
(11, 11, 1),
(12, 12, 5),
(13, 13, 1),
(14, 14, 5),
(16, 16, 5),
(17, 17, 1),
(18, 18, 5),
(19, 19, 1),
(20, 20, 5),
(21, 21, 1),
(22, 22, 5),
(23, 23, 1),
(24, 24, 5),
(26, 26, 5),
(27, 27, 1),
(28, 28, 5),
(29, 29, 1),
(30, 30, 5),
(31, 31, 1),
(32, 32, 5),
(33, 33, 1),
(34, 34, 5),
(36, 36, 5),
(37, 37, 1),
(38, 38, 5),
(39, 39, 1),
(40, 40, 5),
(41, 41, 1),
(42, 42, 5),
(43, 43, 1),
(44, 44, 5),
(46, 46, 5),
(47, 47, 1),
(48, 48, 5),
(52, 52, 5),
(53, 53, 1),
(54, 54, 5),
(56, 58, 6),
(57, 56, 6),
(59, 49, 6),
(61, 60, 6),
(62, 59, 6),
(63, 51, 6),
(64, 50, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ai_list`
--
ALTER TABLE `ai_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teamid_team_idx` (`user_id`),
  ADD KEY `fk_movieid_movies_idx` (`movie_id`);

--
-- Indexes for table `director_profile`
--
ALTER TABLE `director_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movieid_movies_idx` (`movie_id`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teamid_team_idx` (`user_id`),
  ADD KEY `fk_email_movieid_idx` (`movie_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_moviestatus_idx` (`status`);

--
-- Indexes for table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_newsletter_email` (`email`);

--
-- Indexes for table `screenshots`
--
ALTER TABLE `screenshots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_screenshots_movies` (`movie_id`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_socials_movies` (`movie_id`);

--
-- Indexes for table `sound_data`
--
ALTER TABLE `sound_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sound_data_movies` (`movie_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `used_ai`
--
ALTER TABLE `used_ai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usedai_movies_idx` (`movie_id`),
  ADD KEY `fk_usedai_ai_list_idx` (`ai_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_movies`
--
ALTER TABLE `users_movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movieid_movies_idx` (`movie_id`),
  ADD KEY `fk_teamid_team_idx` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ai_list`
--
ALTER TABLE `ai_list`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `director_profile`
--
ALTER TABLE `director_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `screenshots`
--
ALTER TABLE `screenshots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `sound_data`
--
ALTER TABLE `sound_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `used_ai`
--
ALTER TABLE `used_ai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_movies`
--
ALTER TABLE `users_movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_movies_users_comments` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_comments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `director_profile`
--
ALTER TABLE `director_profile`
  ADD CONSTRAINT `fk_movies_director` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `email`
--
ALTER TABLE `email`
  ADD CONSTRAINT `fk_autoemail_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_email_movieid` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `fk_movies_status` FOREIGN KEY (`status`) REFERENCES `status` (`id`);

--
-- Constraints for table `screenshots`
--
ALTER TABLE `screenshots`
  ADD CONSTRAINT `fk_screenshots_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `socials`
--
ALTER TABLE `socials`
  ADD CONSTRAINT `fk_socials_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sound_data`
--
ALTER TABLE `sound_data`
  ADD CONSTRAINT `fk_sound_data_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `used_ai`
--
ALTER TABLE `used_ai`
  ADD CONSTRAINT `fk_usedai_ai_list` FOREIGN KEY (`ai_name`) REFERENCES `ai_list` (`id`),
  ADD CONSTRAINT `fk_usedai_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_movies`
--
ALTER TABLE `users_movies`
  ADD CONSTRAINT `fk_movies_users_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_movies_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

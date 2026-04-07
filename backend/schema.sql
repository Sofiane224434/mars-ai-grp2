-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 07, 2026 at 12:31 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `ai_list`
--

CREATE TABLE `ai_list` (
  `id` int NOT NULL,
  `ai_name` varchar(100) NOT NULL,
  `included` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `movie_id`, `comment`) VALUES
(1, 1, 1, 'L\'utilisation de Midjourney sur les plans larges est incroyable. La colorimétrie est parfaite et le rythme est très bien maîtrisé.'),
(2, 1, 1, 'ce film est très correct'),
(3, 1, 1, 'Très sombre'),
(4, 1, 10, 'huih'),
(5, 1, 9, 'fdf'),
(6, 1, 11, 'tres bien'),
(7, 1, 8, 'sdsd');

-- --------------------------------------------------------

--
-- Table structure for table `director_profile`
--

CREATE TABLE `director_profile` (
  `id` int NOT NULL,
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
  `date_of_birth` timestamp NOT NULL,
  `gender` enum('mr','mme','iel') NOT NULL,
  `fix_phone` varchar(45) DEFAULT NULL,
  `mobile_phone` varchar(45) NOT NULL,
  `school` varchar(255) NOT NULL,
  `current_job` varchar(255) NOT NULL,
  `director_language` varchar(100) NOT NULL DEFAULT 'Non renseigné'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `director_profile`
--

INSERT INTO `director_profile` (`id`, `movie_id`, `email`, `firstname`, `lastname`, `address`, `address2`, `postal_code`, `city`, `country`, `marketting`, `date_of_birth`, `gender`, `fix_phone`, `mobile_phone`, `school`, `current_job`, `director_language`) VALUES
(1, 1, 'flavie.michel@laplateforme.io', 'Steven', 'Spielberg', '123 Avenue des Caméras', 'Bâtiment B', '75000', 'Paris', 'France', 'Oui', '1985-05-14 22:00:00', 'mme', '0102030405', '0607080910', 'École de Cinéma', 'Réalisateur', 'français'),
(2, 2, 'jean.dupont@test.fr', 'Jean', 'Dupont', '1 rue de Mars', '', '75001', 'Paris', 'France', 'oui', '1989-12-31 23:00:00', 'mr', '0102030405', '0601020304', 'EICAR', 'Réalisateur', 'Non renseigné'),
(3, 3, 'alice.smith@test.com', 'Alice', 'Smith', '2 neon street', '', '10001', 'New York', 'USA', 'non', '1985-05-11 22:00:00', 'mme', '', '555-0199', 'NYFA', 'VFX Artist', 'Non renseigné'),
(4, 4, 'lucas.martin@test.fr', 'Lucas', 'Martin', '3 avenue de l\'océan', '', '13000', 'Marseille', 'France', 'oui', '1992-08-23 22:00:00', 'mr', '', '0611223344', 'La Fémis', 'Documentariste', 'Non renseigné'),
(5, 5, 'camille.doux@test.fr', 'Camille', 'Doux', '4 bd des données', '', '69000', 'Lyon', 'France', 'oui', '1995-11-29 23:00:00', 'iel', '0405060708', '0699887766', 'Gobelins', 'AI Prompt Engineer', 'Non renseigné'),
(6, 6, 'wei.chen@test.cn', 'Wei', 'Chen', '5 silk road', '', '10000', 'Beijing', 'Chine', 'non', '1988-02-13 23:00:00', 'mr', '', '+8612345678', 'BFA', 'Animateur', 'Non renseigné'),
(7, 7, 'sarah.connor@test.fr', 'Sarah', 'Connor', '6 rue du temps', '', '33000', 'Bordeaux', 'France', 'oui', '1991-04-03 22:00:00', 'mme', '', '0644556677', 'Autodidacte', 'Monteuse', 'Non renseigné'),
(8, 8, 'alex.nova@test.com', 'Alex', 'Nova', '7 star avenue', '', '90210', 'Los Angeles', 'USA', 'oui', '1998-07-19 22:00:00', 'iel', '', '555-0188', 'UCLA', 'Créateur Digital', 'Non renseigné'),
(9, 9, 'pierre.durand@test.fr', 'Pierre', 'Durand', '8 route du phare', '', '29200', 'Brest', 'France', 'non', '1980-12-11 23:00:00', 'mr', '0203040506', '0655443322', 'EICAR', 'Directeur de la photo', 'Non renseigné'),
(10, 10, 'claire.vallee@test.fr', 'Claire', 'Vallée', '9 chemin fleuri', '', '44000', 'Nantes', 'France', 'oui', '1993-09-08 22:00:00', 'mme', '', '0677889900', 'ENS Louis-Lumière', 'Réalisatrice', 'Non renseigné'),
(11, 11, 'diego.garcia@test.es', 'Diego', 'Garcia', '10 plaza mayor', '', '28001', 'Madrid', 'Espagne', 'non', '1987-03-20 23:00:00', 'mr', '', '+349123456', 'ECAM', 'Etudiant', 'Non renseigné');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

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
(1, 'Votre film est valide', 'Votre film est officiellement valide pour cette edition. Bravo !', 1, 1, NULL),
(2, 'Felicitation ! Votre film est selectionne', 'L\'equipe de MarsAI a le plaisir de vous annoncer que votre film a ete valide par notre jury.', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

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
  `synospsis_english` longtext NOT NULL,
  `youtube_url` varchar(255) NOT NULL,
  `movie_duration` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title_original`, `subtitles`, `videofile`, `language`, `description`, `prompt`, `status`, `synopsis_original`, `classification`, `thumbnail`, `created_at`, `updated_at`, `title_english`, `synospsis_english`, `youtube_url`, `movie_duration`) VALUES
(1, 'Le Premier Film', 'soustitres.srt', 'film_01.mp4', 'fr', 'Description factice pour le test de notre API.', 'Un prompt généré par IA.', 3, 'Un synopsis en français.', 'Tout public', 'thumb_01.jpg', '2026-03-26 14:11:38', '2026-03-26 14:11:38', 'The First Movie', 'An English synopsis.', 'https://youtube.com/watch?v=test', '00:15:00'),
(2, 'L\'Éveil de Mars', 'fr', 'mars_eveil.mp4', 'Français', 'Documentaire fiction.', 'Cinematic shot of Mars...', 1, 'L\'humanité pose le pied sur Mars et découvre un secret enfoui.', 'Tout public', 'thumb1.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Mars Awakening', 'Humanity steps on Mars.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:15:00'),
(3, 'Cyberpunk 2099', 'en', 'cyber_2099.mp4', 'Anglais', 'Action sci-fi.', 'Neon city cyberpunk style...', 1, 'Dans une ville au néon, une détective traque une IA dévoyée.', '12+', 'thumb2.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Cyberpunk 2099', 'In a neon city...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:08:30'),
(4, 'Le Dernier Océan', 'fr', 'ocean.mp4', 'Français', 'Drame écologique.', 'Deep blue ocean depth...', 4, 'La dernière goutte d\'eau pure de la planète est mise aux enchères.', 'Tout public', 'thumb3.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'The Last Ocean', 'The last drop...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:12:00'),
(5, 'Odyssée IA', 'fr', 'ai_odyssey.mp4', 'Français', 'Réflexion sur l\'IA.', 'Abstract digital brain...', 2, 'Un ingénieur tombe amoureux du réseau neuronal qu\'il a créé.', 'Tout public', 'thumb4.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'AI Odyssey', 'AI awakens.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:05:45'),
(6, 'Ombres Chinoises', 'cn', 'shadows.mp4', 'Chinois', 'Animation.', 'Traditional shadow puppet...', 2, 'Un conte ancien revisité par l\'intelligence artificielle.', 'Tout public', 'thumb5.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Chinese Shadows', 'An ancient tale.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:03:20'),
(7, 'Course Temporelle', 'fr', 'time_run.mp4', 'Français', 'Action frénétique.', 'Time travel visual effects...', 2, 'Un homme court contre le temps pour sauver sa réalité.', '16+', 'thumb6.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Time Race', 'A man races time.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:20:00'),
(8, 'Lumière d\'Étoile', 'en', 'starlight.mp4', 'Anglais', 'Poésie visuelle.', 'Starry night sky falling...', 3, 'Une étoile qui tombe sur Terre sous la forme d\'un enfant.', 'Tout public', 'thumb7.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Starlight', 'A falling star.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:04:10'),
(9, 'Le Mystère du Phare', 'fr', 'lighthouse.mp4', 'Français', 'Thriller.', 'Dark isolated lighthouse...', 4, 'Deux gardiens de phare isolés affrontent leurs pires cauchemars.', '12+', 'thumb8.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Lighthouse Mystery', 'Two isolated keepers.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:18:00'),
(10, 'Symphonie Végétale', 'fr', 'nature.mp4', 'Français', 'Documentaire.', 'Forest macro photography...', 1, 'La vie secrète des plantes révélée par la macro-vidéo IA.', 'Tout public', 'thumb9.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Plant Symphony', 'Secret life of plants.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:10:00'),
(11, 'Horizon Perdu', 'es', 'horizon.mp4', 'Espagnol', 'Aventure.', 'Vast desert horizon cinematic...', 4, 'La quête périlleuse d\'un oasis mythique en plein désert.', 'Tout public', 'thumb10.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Lost Horizon', 'Quest for a mythic oasis.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:14:30');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `screenshots`
--

CREATE TABLE `screenshots` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `social_name` varchar(100) NOT NULL,
  `social_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sound_data`
--

CREATE TABLE `sound_data` (
  `id` int NOT NULL,
  `sound` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `movie_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

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

CREATE TABLE `used_ai` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `ai_name` int NOT NULL,
  `category` enum('script','movie','postprod') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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
(2, 'admin@marsai.fr', 'admin', 'tav-admin-local-1');

-- --------------------------------------------------------

--
-- Table structure for table `users_movies`
--

CREATE TABLE `users_movies` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_movies`
--

INSERT INTO `users_movies` (`id`, `movie_id`, `user_id`) VALUES
(3, 1, 1),
(4, 2, 1),
(5, 3, 1),
(6, 4, 1),
(7, 5, 1),
(8, 6, 1),
(9, 7, 1),
(10, 8, 1),
(11, 9, 1),
(12, 10, 1),
(13, 11, 1);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `screenshots`
--
ALTER TABLE `screenshots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_screenshots_movies_idx` (`movie_id`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_socials_idx` (`movie_id`);

--
-- Indexes for table `sound_data`
--
ALTER TABLE `sound_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sound_data_movies_idx` (`movie_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `director_profile`
--
ALTER TABLE `director_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `email`
--
ALTER TABLE `email`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `screenshots`
--
ALTER TABLE `screenshots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sound_data`
--
ALTER TABLE `sound_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `used_ai`
--
ALTER TABLE `used_ai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_movies`
--
ALTER TABLE `users_movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  ADD CONSTRAINT `fk_screenshots_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `socials`
--
ALTER TABLE `socials`
  ADD CONSTRAINT `fk_socials_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sound_data`
--
ALTER TABLE `sound_data`
  ADD CONSTRAINT `fk_sound_data_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

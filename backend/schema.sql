-- Fusion MarsAI : Structure Schema 1 + Données Schema 2
-- Généré pour MySQL / MariaDB

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema marsai
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `marsai` DEFAULT CHARACTER SET utf8mb4 ;
USE `marsai` ;

-- -----------------------------------------------------
-- Table `marsai`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `marsai`.`status` (`id`, `status`) VALUES 
(1, 'pending'), (2, 'rejected'), (3, 'review'), (4, 'approved'), (5, 'top50'), (6, 'top5');

-- -----------------------------------------------------
-- Table `marsai`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title_original` VARCHAR(255) NOT NULL,
  `subtitles` LONGTEXT NOT NULL,
  `videofile` VARCHAR(255) NOT NULL,
  `language` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `prompt` LONGTEXT NOT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `synopsis_original` LONGTEXT NOT NULL,
  `classification` VARCHAR(255) NOT NULL,
  `thumbnail` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `title_english` VARCHAR(255) NOT NULL,
  `synopsis_english` LONGTEXT NOT NULL,
  `youtube_url` VARCHAR(255) NOT NULL,
  `movie_duration` TIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_moviestatus_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_movies_status`
    FOREIGN KEY (`status`)
    REFERENCES `marsai`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `marsai`.`movies` (`id`, `title_original`, `subtitles`, `videofile`, `language`, `description`, `prompt`, `status`, `synopsis_original`, `classification`, `thumbnail`, `created_at`, `updated_at`, `title_english`, `synopsis_english`, `youtube_url`, `movie_duration`) VALUES
(1, 'Le Premier Film', 'soustitres.srt', 'film_01.mp4', 'fr', 'Description factice.', 'Un prompt généré par IA.', 3, 'Un synopsis en français.', 'Tout public', 'thumb_01.jpg', '2026-03-26 14:11:38', '2026-03-26 14:11:38', 'The First Movie', 'An English synopsis.', 'https://youtube.com/watch?v=test', '00:15:00'),
(2, 'L''Éveil de Mars', 'fr', 'mars_eveil.mp4', 'Français', 'Documentaire fiction.', 'Cinematic shot of Mars...', 1, 'L''humanité découvre un secret enfoui.', 'Tout public', 'thumb1.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Mars Awakening', 'Humanity steps on Mars.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:15:00'),
(3, 'Cyberpunk 2099', 'en', 'cyber_2099.mp4', 'Anglais', 'Action sci-fi.', 'Neon city cyberpunk style...', 1, 'Une détective traque une IA dévoyée.', '12+', 'thumb2.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Cyberpunk 2099', 'In a neon city...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:08:30'),
(4, 'Le Dernier Océan', 'fr', 'ocean.mp4', 'Français', 'Drame écologique.', 'Deep blue ocean depth...', 4, 'La dernière goutte d''eau pure.', 'Tout public', 'thumb3.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'The Last Ocean', 'The last drop...', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:12:00'),
(5, 'Odyssée IA', 'fr', 'ai_odyssey.mp4', 'Français', 'Réflexion sur l''IA.', 'Abstract digital brain...', 2, 'Un ingénieur tombe amoureux.', 'Tout public', 'thumb4.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'AI Odyssey', 'AI awakens.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:05:45'),
(6, 'Ombres Chinoises', 'cn', 'shadows.mp4', 'Chinois', 'Animation.', 'Traditional shadow puppet...', 2, 'Un conte ancien revisité.', 'Tout public', 'thumb5.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Chinese Shadows', 'An ancient tale.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:03:20'),
(7, 'Course Temporelle', 'fr', 'time_run.mp4', 'Français', 'Action frénétique.', 'Time travel visual effects...', 2, 'Un homme court contre le temps.', '16+', 'thumb6.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Time Race', 'A man races time.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:20:00'),
(8, 'Lumière d''Étoile', 'en', 'starlight.mp4', 'Anglais', 'Poésie visuelle.', 'Starry night sky falling...', 3, 'Une étoile qui tombe sur Terre.', 'Tout public', 'thumb7.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Starlight', 'A falling star.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:04:10'),
(9, 'Le Mystère du Phare', 'fr', 'lighthouse.mp4', 'Français', 'Thriller.', 'Dark isolated lighthouse...', 4, 'Deux gardiens affrontent leurs cauchemars.', '12+', 'thumb8.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Lighthouse Mystery', 'Two isolated keepers.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:18:00'),
(10, 'Symphonie Végétale', 'fr', 'nature.mp4', 'Français', 'Documentaire.', 'Forest macro photography...', 1, 'La vie secrète des plantes.', 'Tout public', 'thumb9.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Plant Symphony', 'Secret life of plants.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:10:00'),
(11, 'Horizon Perdu', 'es', 'horizon.mp4', 'Espagnol', 'Aventure.', 'Vast desert horizon cinematic...', 4, 'La quête périlleuse d''un oasis.', 'Tout public', 'thumb10.jpg', '2026-04-02 08:02:31', '2026-04-02 08:02:31', 'Lost Horizon', 'Quest for a mythic oasis.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '00:14:30'),
(12, 'L''Aube des Algorithmes', 'fr', 'aube_algo.mp4', 'Français', 'Thriller IA.', 'Cinematic shot...', 4, 'Un détective traque une IA.', '12+', 'thumb_aube.jpg', '2026-04-08 11:33:49', '2026-04-08 11:33:49', 'Dawn of Algorithms', 'A detective tracks a rogue AI.', 'https://youtube.com/watch?v=demo123', '00:15:00');

-- -----------------------------------------------------
-- Table `marsai`.`ai_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`ai_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ai_name` VARCHAR(100) NOT NULL,
  `included` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `marsai`.`ai_list` (`id`, `ai_name`, `included`) VALUES (1, 'Runway Gen-2', 1);

-- -----------------------------------------------------
-- Table `marsai`.`used_ai`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`used_ai` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `ai_name` INT NOT NULL,
  `category` ENUM("script", "movie", "postprod") NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usedai_movies_idx` (`movie_id` ASC) VISIBLE,
  INDEX `fk_usedai_ai_list_idx` (`ai_name` ASC) VISIBLE,
  CONSTRAINT `fk_usedai_movies`
    FOREIGN KEY (`movie_id`)
    REFERENCES `marsai`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usedai_ai_list`
    FOREIGN KEY (`ai_name`)
    REFERENCES `marsai`.`ai_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `marsai`.`used_ai` (`id`, `movie_id`, `ai_name`, `category`) VALUES (1, 12, 1, 'movie');

-- -----------------------------------------------------
-- Table `marsai`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `status` ENUM("admin", "jury") NOT NULL,
  `token_access` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `marsai`.`users` (`id`, `email`, `status`, `token_access`) VALUES
(1, 'jury@marsai.fr', 'jury', 'DEV_TEMP_TOKEN'),
(2, 'admin@marsai.fr', 'admin', 'tav-admin-local-1'),
(3, 'flavie.michel@laplateforme.io', 'admin', 'tav-admin-flavie-1');

-- -----------------------------------------------------
-- Table `marsai`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `isprivate` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_teamid_team_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_movieid_movies_idx` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_comments_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `marsai`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movies_users_comments`
    FOREIGN KEY (`movie_id`)
    REFERENCES `marsai`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `marsai`.`comments` (`id`, `user_id`, `movie_id`, `comment`, `isprivate`) VALUES
(1, 1, 1, 'Utilisation de Midjourney incroyable.', 0),
(2, 1, 1, 'ce film est très correct', 0),
(3, 1, 1, 'Très sombre', 0),
(4, 1, 10, 'huih', 0),
(5, 1, 9, 'fdf', 0),
(6, 1, 11, 'tres bien', 0),
(7, 1, 8, 'sdsd', 0),
(8, 1, 12, 'Très beau travail sur la colorimétrie.', 0);

-- -----------------------------------------------------
-- Table `marsai`.`users_movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`users_movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movieid_movies_idx` (`movie_id` ASC) VISIBLE,
  INDEX `fk_teamid_team_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_movies_users_movies`
    FOREIGN KEY (`movie_id`)
    REFERENCES `marsai`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_movies_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `marsai`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `marsai`.`users_movies` (`id`, `movie_id`, `user_id`) VALUES
(3, 1, 1), (4, 2, 1), (5, 3, 1), (6, 4, 1), (7, 5, 1), (8, 6, 1), (9, 7, 1), (10, 8, 1), (11, 9, 1), (12, 10, 1), (13, 11, 1), (14, 12, 1);

-- -----------------------------------------------------
-- Table `marsai`.`email`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`email` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `object` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `sent_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teamid_team_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_email_movieid_idx` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `fk_autoemail_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `marsai`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_email_movieid`
    FOREIGN KEY (`movie_id`)
    REFERENCES `marsai`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `marsai`.`email` (`id`, `object`, `message`, `user_id`, `movie_id`, `sent_at`) VALUES
(1, 'Votre film est valide', 'Votre film est officiellement valide.', 1, 1, NULL),
(2, 'Felicitation !', 'L''equipe de MarsAI a le plaisir de vous annoncer...', 1, 1, NULL),
(3, 'MarsAI - Décision', 'Bonjour Pierre, Excellente nouvelle...', 2, 9, '2026-04-07 14:08:30');

-- -----------------------------------------------------
-- Table `marsai`.`director_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marsai`.`director_profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `address2` VARCHAR(255) NOT NULL,
  `postal_code` VARCHAR(5) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `marketting` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` ENUM("mr", "mme", "iel") NOT NULL,
  `fix_phone` VARCHAR(45) NULL,
  `mobile_phone` VARCHAR(45) NOT NULL,
  `school` VARCHAR(255) NOT NULL,
  `current_job` VARCHAR(255) NOT NULL,
  `director_language` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movieid_movies_idx` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `fk_movies_director`
    FOREIGN KEY (`movie_id`)
    REFERENCES `marsai`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `marsai`.`director_profile` (`id`, `movie_id`, `email`, `firstname`, `lastname`, `address`, `address2`, `postal_code`, `city`, `country`, `marketting`, `date_of_birth`, `gender`, `fix_phone`, `mobile_phone`, `school`, `current_job`, `director_language`) VALUES
(1, 1, 'flavie.michel@laplateforme.io', 'Steven', 'Spielberg', '123 Avenue des Caméras', 'Bâtiment B', '75000', 'Paris', 'France', 'Oui', '1985-05-15', 'mme', '0102030405', '0607080910', 'École de Cinéma', 'Réalisateur', 'français'),
(12, 12, 'nolan.ai@test.com', 'Christopher', 'Nolan', '15 avenue du Cinéma', '', '75008', 'Paris', 'France', 'oui', '1980-05-15', 'mr', '0102030405', '0600112233', 'Autodidacte', 'Réalisateur Numérique', 'Français');


-- (Optionnel) Ajout des tables vides pour garder la structure complète
CREATE TABLE IF NOT EXISTS `marsai`.`socials` ( `id` INT NOT NULL AUTO_INCREMENT, `movie_id` INT NOT NULL, `social_name` VARCHAR(100) NOT NULL, `social_link` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_socials_movies` FOREIGN KEY (`movie_id`) REFERENCES `marsai`.`movies` (`id`) ON DELETE CASCADE) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `marsai`.`newsletter` ( `id` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(100) NOT NULL, `status` ENUM('subscribed', 'unsubscribed') NOT NULL DEFAULT 'subscribed', PRIMARY KEY (`id`), UNIQUE INDEX `uq_newsletter_email` (`email` ASC) VISIBLE) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `marsai`.`screenshots` ( `id` INT NOT NULL AUTO_INCREMENT, `movie_id` INT NOT NULL, `link` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_screenshots_movies` FOREIGN KEY (`movie_id`) REFERENCES `marsai`.`movies` (`id`) ON DELETE CASCADE) ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `marsai`.`sound_data` ( `id` INT NOT NULL AUTO_INCREMENT, `sound` VARCHAR(255) NOT NULL, `type` VARCHAR(100) NOT NULL, `movie_id` INT NOT NULL, PRIMARY KEY (`id`), CONSTRAINT `fk_sound_data_movies` FOREIGN KEY (`movie_id`) REFERENCES `marsai`.`movies` (`id`) ON DELETE CASCADE) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
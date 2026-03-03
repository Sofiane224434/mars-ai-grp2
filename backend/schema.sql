CREATE DATABASE IF NOT EXISTS starter_kit
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE starter_kit;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- TODO: Ajouter vos tables ici (rooms, reservations...)

-- Pour exécuter le script : mysql -u root -p < backend/schema.sql
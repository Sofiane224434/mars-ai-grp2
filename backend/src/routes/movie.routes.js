import express from "express";
import multer from "multer";
import { addMovie, getMovieImage } from "../controllers/movie.controller.js";

const router = express.Router();

// Stockage temporaire local avant upload S3
const upload = multer({ dest: "uploads/" });

// Upload d'un fichier video:
// - stockage S3
// - envoi YouTube
router.post("/movies", upload.single("video_file"), addMovie);

// Récupération d'un fichier S3 via query param
// Exemple: /api/movies/images?key=grp2%2F<mon_fichier>
router.get("/movies/images", getMovieImage);

export default router;

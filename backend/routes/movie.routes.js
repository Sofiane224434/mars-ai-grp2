import express from 'express';
import multer from 'multer';
import { addMovie, getMovieImage } from '../controllers/movie.controller.js'; 

const router = express.Router();

//  Stocke les fichiers temporairement sur le disque (backend/uploads) avant de les uploader vers S3.
// 'video_file' -> nom du champ dans le formulaire de téléchargement (front)
const upload = multer({ dest: 'uploads/' });

// Route pour upload de films
router.post('/movies', upload.single('video_file'), addMovie);
// Route pour récupérer les images des films
router.get('/movies/images/:key', getMovieImage); 

export default router;

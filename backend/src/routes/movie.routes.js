import express from "express";
import multer from "multer";
import { addMovie, getMovieImage, getPublicMovieDetailById, getPublicMoviesList } from "../controllers/movie.controller.js";
import { getAllMoviesForAdmin, assignMovieToJuries, getJuryAssignmentOptions } from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { assignMovieSchema } from "../schemas/admin.schema.js";

const router = express.Router();

const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        const details = error?.issues || error?.errors || [{ message: "Requete invalide." }];
        return res.status(400).json({ erreurs: details });
    }
};

// Stockage temporaire local avant upload S3
const upload = multer({ dest: "uploads/" });

// Films publics (Top 50 / Top 5 selon la phase) - pas d'authentification requise
router.get("/movies/public", getPublicMoviesList);
router.get("/movies/public/:movieId", getPublicMovieDetailById);

// Upload d'un fichier video:
// - stockage S3
// - envoi YouTube
router.post("/movies", upload.single("video_file"), addMovie);

// Liste admin de tous les films avec statut d'evaluation et jurys assignes
router.get("/movies", requireAuth("admin"), getAllMoviesForAdmin);

// Assignation 1:1 d'un film a un seul jury
router.post("/movies/assign", requireAuth("admin"), validateRequest(assignMovieSchema), assignMovieToJuries);

// Liste des jurys avec leur charge d'assignation
router.get("/movies/juries", requireAuth("admin"), getJuryAssignmentOptions);

// Récupération d'un fichier S3 via query param
// Exemple: /api/movies/images?key=grp2%2F<mon_fichier>
router.get("/movies/images", getMovieImage);

export default router;

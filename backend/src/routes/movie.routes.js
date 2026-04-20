import express from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { addMovie, getMovieImage, getPublicMovieDetailById, getPublicMoviesList } from "../controllers/movie.controller.js";
import { getAllMoviesForAdmin, assignMovieToJuries, getJuryAssignmentOptions } from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { assignMovieSchema } from "../schemas/admin.schema.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRootDir = path.resolve(__dirname, "../../uploads/submissions");

const ensureUploadDirectory = (subfolder) => {
    const directory = path.join(uploadsRootDir, subfolder);
    fs.mkdirSync(directory, { recursive: true });
    return directory;
};

const fieldFolderMap = {
    video_file: "videos",
    thumbnail_file: "thumbnails",
    subtitles_file: "subtitles",
    screenshot_files: "screenshots",
};

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
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const folder = fieldFolderMap[file.fieldname] || "misc";
            const outputPath = ensureUploadDirectory(folder);
            callback(null, outputPath);
        },
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname || "").toLowerCase();
            const basename = path
                .basename(file.originalname || "file", extension)
                .replace(/[^a-zA-Z0-9-_]/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
                .slice(0, 60) || "file";

            callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${basename}${extension}`);
        },
    }),
    limits: {
        fileSize: 300 * 1024 * 1024,
    },
});

// Films publics (Top 50 / Top 5 selon la phase) - pas d'authentification requise
router.get("/movies/public", getPublicMoviesList);
router.get("/movies/public/:movieId", getPublicMovieDetailById);

// Upload d'un fichier video:
// - stockage S3
// - envoi YouTube
router.post(
    "/movies",
    upload.fields([
        { name: "video_file", maxCount: 1 },
        { name: "thumbnail_file", maxCount: 1 },
        { name: "subtitles_file", maxCount: 1 },
        { name: "screenshot_files", maxCount: 3 },
    ]),
    addMovie
);

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

import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';

// Import de TOUS les schémas de validation
import { 
  getMovieByIdSchema, 
  updateMovieStatusSchema,
  getJuryCommentsSchema,
  postJuryCommentSchema 
} from '../schemas/jury.schema.js';

// Import des contrôleurs
import { getAssignedMovies, getMovieById, validateMovieStatus } from '../controllers/juryMovie.controller.js';
import { getJuryComments, postJuryComment } from '../controllers/juryComment.controller.js';

const router = express.Router();

// --- L'EXÉCUTEUR ZOD ---
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const details = error?.issues || error?.errors || [{ message: 'Requete invalide.' }];
    return res.status(400).json({ erreurs: details });
  }
};

// --- SÉCURITÉ GLOBALE ---
// TOUTES les routes en dessous nécessiteront le rôle "jury"
router.use(requireAuth('jury'));

// ==========================================
// 🎬 ROUTES : FILMS
// ==========================================

// Liste des films assignés
router.get('/movies', getAssignedMovies);

// Détail d'un film spécifique
router.get('/movies/:id', validateRequest(getMovieByIdSchema), getMovieById);

// Mise à jour du statut (Vote)
router.put('/movies/:id/status', validateRequest(updateMovieStatusSchema), validateMovieStatus);


// ==========================================
// 💬 ROUTES : NOTES (COMMENTAIRES)
// ==========================================

// Récupérer les notes d'un film (?movieId=X)
router.get('/comments', validateRequest(getJuryCommentsSchema), getJuryComments);

// Ajouter une nouvelle note
router.post('/comments', validateRequest(postJuryCommentSchema), postJuryComment);

export default router;
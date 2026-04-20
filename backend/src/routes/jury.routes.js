import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';

// Import de TOUS les schémas de validation
import {
  getMovieByIdSchema,
  updateMovieStatusSchema,
  updateTop5RankSchema,
  getJuryCommentsSchema,
  postJuryCommentSchema,
  putJuryCommentSchema,
  deleteJuryCommentSchema
} from '../schemas/jury.schema.js';

// Import des contrôleurs
import { getAssignedMovies, getMovieById, updateTop5Rank, validateMovieStatus } from '../controllers/juryMovie.controller.js';
import {
  deleteJuryComment,
  getJuryComments,
  postJuryComment,
  putJuryComment
} from '../controllers/juryComment.controller.js';

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
router.use(requireAuth(['jury']));

// ==========================================
// 🎬 ROUTES : FILMS
// ==========================================

// Liste des films assignés
router.get('/movies', getAssignedMovies);

// Détail d'un film spécifique
router.get('/movies/:id', validateRequest(getMovieByIdSchema), getMovieById);

// Mise à jour du statut (Vote)
router.put('/movies/:id/status', validateRequest(updateMovieStatusSchema), validateMovieStatus);

// Mise à jour du rang podium Top 5 (1, 2, 3 ou null)
router.put('/movies/:id/top5-rank', validateRequest(updateTop5RankSchema), updateTop5Rank);


// ==========================================
// 💬 ROUTES : NOTES (COMMENTAIRES)
// ==========================================

// Récupérer les notes d'un film (?movieId=X)
router.get('/comments', validateRequest(getJuryCommentsSchema), getJuryComments);

// Ajouter une nouvelle note
router.post('/comments', validateRequest(postJuryCommentSchema), postJuryComment);

// Modifier une note existante
router.put('/comments/:commentId', validateRequest(putJuryCommentSchema), putJuryComment);

// Supprimer une note
router.delete('/comments/:commentId', validateRequest(deleteJuryCommentSchema), deleteJuryComment);

export default router;
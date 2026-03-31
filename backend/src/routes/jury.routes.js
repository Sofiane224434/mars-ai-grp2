import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { getMovieByIdSchema, updateMovieStatusSchema } from '../schemas/jury.schema.js';
import { getAssignedMovies, getMovieById, validateMovieStatus } from '../controllers/juryMovie.controller.js';

const router = express.Router();

// --- L'EXÉCUTEUR ZOD ---
// C'est une petite fonction moderne qui fait le pont entre Express et Zod.
// Elle prend ton schéma, valide la requête, et bloque tout en cas d'erreur (Erreur 400 Bad Request).
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next(); // Le colis est propre, on laisse passer !
  } catch (error) {
    // Le colis est mauvais (ex: statusId = 99), on renvoie l'erreur détaillée au Front-End
    const details = error?.issues || error?.errors || [{ message: 'Requete invalide.' }];
    return res.status(400).json({ erreurs: details });
  }
};

// --- SÉCURITÉ GLOBALE ---
// On place le douanier ici : TOUTES les routes en dessous nécessiteront le rôle "jury"
router.use(requireAuth('jury'));

// --- DÉCLARATION DES ROUTES ---

//  GET /api/jury/movies
// L'utilisateur est déjà vérifié par requireAuth, on l'envoie direct au contrôleur.
router.get('/movies', getAssignedMovies);

// GET /api/jury/movies/:id
// Retourne le détail d'un film assigné au juré connecté.
router.get('/movies/:id', validateRequest(getMovieByIdSchema), getMovieById);

// PUT /api/jury/movies/:id/status
// Ordre de passage : requireAuth (deja passe) -> validateRequest (Zod) -> validateMovieStatus (Controleur)
router.put('/movies/:id/status', validateRequest(updateMovieStatusSchema), validateMovieStatus);

// On exporte le routeur pour que le serveur principal puisse l'utiliser
export default router;
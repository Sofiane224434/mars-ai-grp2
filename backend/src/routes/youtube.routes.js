import { Router } from 'express';
import {
  startYouTubeOAuth,
  handleYouTubeOAuthCallback,
} from '../controllers/youtube.controller.js';

const router = Router();

// Point d'entree OAuth:
// redirige l'utilisateur vers Google pour autoriser l'application.
router.get('/oauth/start', startYouTubeOAuth);

// Callback OAuth:
// recoit le code Google, l'echange contre des tokens,
// puis retourne le refresh token a enregistrer dans backend/.env.
router.get('/oauth/callback', handleYouTubeOAuthCallback);

export default router;

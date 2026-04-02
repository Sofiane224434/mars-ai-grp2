import { Router } from 'express';
import {
  startYouTubeOAuth,
  handleYouTubeOAuthCallback,
} from '../controllers/youtube.controller.js';

const router = Router();

//génère l’URL Google OAuth avec scope youtube.upload et redirige
router.get('/oauth/start', startYouTubeOAuth);
//lit le code, échange contre tokens, puis affiche le refresh token
router.get('/oauth/callback', handleYouTubeOAuthCallback);

export default router;

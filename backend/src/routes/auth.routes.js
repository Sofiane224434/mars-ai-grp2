// routes/auth.routes.js
import { Router } from 'express'; // Import nommé ⬅️
import { register, login, getProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();
// Routes publiques
router.post('/register', register);
router.post('/login', login);
// Routes protégées
router.get('/me', authMiddleware, getProfile);
export default router;
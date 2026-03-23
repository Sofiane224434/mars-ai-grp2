// routes/auth.routes.js
import { Router } from 'express'; // Import nommé ⬅️
import { register, login, getProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();
// Routes protégées
router.get('/me', authMiddleware, getProfile);
export default router;
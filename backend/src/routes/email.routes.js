import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { sendEmail } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', authMiddleware, sendEmail);

export default router;
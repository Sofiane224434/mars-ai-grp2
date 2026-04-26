import { z } from 'zod';
import { sendCustomEmail } from '../services/email.service.js';

const emailSchema = z.object({
    to: z.email('Email destinataire invalide'),
    subject: z.string().trim().min(1, 'Sujet requis').max(120, 'Sujet trop long'),
    message: z.string().trim().min(1, 'Message requis').max(5000, 'Message trop long'),
    name: z.string().trim().max(80, 'Nom trop long').optional(),
});

export const sendEmail = async (req, res) => {
    try {
        const payload = emailSchema.parse(req.body);
        await sendCustomEmail(payload);
        res.json({ message: 'Email envoye avec succes' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues[0]?.message || 'Donnees invalides' });
        }

        if (error?.message === 'Configuration Brevo incomplète') {
            return res.status(500).json({ error: 'Configuration Brevo incomplete. Verifiez votre .env' });
        }

        res.status(500).json({ error: 'Impossible d\'envoyer l\'email' });
    }
};
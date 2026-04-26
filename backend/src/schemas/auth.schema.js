import { z } from "zod";

export const requestTokenSchema = z.object({
    body: z.object({
        email: z.string().trim().email("Format email invalide"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        token: z.string().min(20, "Token invalide"),
    }),
});

export const inviteJurySchema = z.object({
    body: z.object({
        emails: z
            .array(z.string().trim().email("Format email invalide"))
            .min(1, "Au moins un email est requis")
            .max(50, "Maximum 50 invitations par appel"),
        message: z.string().max(2000, "Message trop long").optional().default(""),
        subject: z.string().trim().max(200, "Objet trop long").optional().default(""),
        body: z.string().max(10000, "Contenu trop long").optional().default(""),
    }),
});
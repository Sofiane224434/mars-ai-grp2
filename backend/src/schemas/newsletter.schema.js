import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Format email invalide"),
  }),
});

export const newsletterUnsubscribeSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Format email invalide"),
  }),
});

export const newsletterUnsubscribeTokenSchema = z.object({
  query: z.object({
    token: z.string().trim().min(1, "Token requis"),
  }),
});

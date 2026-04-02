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
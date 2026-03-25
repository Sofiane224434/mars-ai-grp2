import { z } from "zod";

export const ZodSchema = z.object({
    movietitle: z.string(),
    movietitlefr: z.string(),
    synopsis: z.string().max(300),
    language: z.string(),
    videofile: z.file().max(2_000_000).mime(["video/mp4", "video/mov"]),
    ytlink: z.string(),
    firstname: z.string().max(50),
    lastname: z.string().max(50),
    email: z.email(),
})
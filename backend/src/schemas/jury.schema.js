import { z } from 'zod';

const ALLOWED_VOTE_STATUS_IDS = [1, 2, 3, 4, 5, 6];

const movieIdSchema = z.coerce
    .number({
        required_error: "L'ID du film est obligatoire.",
        invalid_type_error: "L'ID du film doit etre un nombre."
    })
    .int("L'ID du film doit etre un nombre entier.")
    .positive("L'ID du film doit etre superieur a zero.");

const voteStatusIdSchema = z
    .number({
        required_error: "L'ID du statut est obligatoire.",
        invalid_type_error: "L'ID du statut doit etre un nombre."
    })
    .int("L'ID doit etre un nombre entier.")
    .positive("L'ID doit etre superieur a zero.")
    .refine((value) => ALLOWED_VOTE_STATUS_IDS.includes(value), {
        message: "Cet ID de statut n'est pas reconnu. Utilisez 1, 2, 3, 4, 5 ou 6."
    });

const responseStatusIdSchema = z.coerce
    .number({
        required_error: "L'ID du statut est obligatoire.",
        invalid_type_error: "L'ID du statut doit etre un nombre."
    })
    .int("L'ID du statut doit etre un nombre entier.")
    .positive("L'ID du statut doit etre superieur a zero.");

export const movieIdParamsSchema = z.object({
    id: movieIdSchema
});

export const getMovieByIdSchema = z.object({
    params: movieIdParamsSchema
});

export const updateMovieStatusSchema = z.object({
    params: movieIdParamsSchema,
    body: z.object({
        statusId: voteStatusIdSchema
    })
});

export const updateTop5RankSchema = z.object({
    params: movieIdParamsSchema,
    body: z.object({
        rank: z.union([
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.null()
        ])
    })
});

export const movieDetailResponseSchema = z.object({
    id: movieIdSchema,
    title: z.string().min(1, 'Le titre est obligatoire.'),
    title_english: z.string().nullable(),
    synopsis: z.string().nullable(),
    synopsis_english: z.string().nullable(),
    videoUrl: z.string().url('L\'URL de la video est invalide.').nullable(),
    subtitles: z.string().nullable(),
    videofile: z.string().nullable(),
    thumbnail: z.string().nullable(),
    classification: z.string().nullable(),
    screenshotLink: z.string().nullable(),
    language: z.string().min(1, 'La langue est obligatoire.'),
    description: z.string().nullable(),
    prompt: z.string().nullable(),
    movie_duration: z.union([z.string(), z.number()]).nullable(),
    createdAt: z.union([z.string(), z.date()]),
    aiTools: z.string().nullable(),
    statusId: responseStatusIdSchema,
    top5Rank: z.union([z.literal(1), z.literal(2), z.literal(3), z.null()]).default(null),
    status: z.string().min(1, 'Le statut est obligatoire.'),
    directorName: z.string().min(1, 'Le nom du réalisateur est obligatoire.'),
    directorFirstName: z.string().nullable(),
    directorLastName: z.string().nullable(),
    directorEmail: z.string().nullable(),
    gender: z.string().nullable(),
    date_of_birth: z.union([z.string(), z.date()]).nullable(),
    address: z.string().nullable(),
    address2: z.string().nullable(),
    postal_code: z.union([z.string(), z.number()]).nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
    director_language: z.string().nullable(),
    fix_phone: z.string().nullable(),
    mobile_phone: z.string().nullable(),
    school: z.string().nullable(),
    current_job: z.string().nullable(),
    usedAis: z.array(z.object({ ai_name: z.string().nullable(), category: z.string().nullable() })).default([]),
    assignedJuries: z.array(z.object({ id: z.number().int(), name: z.string() })).default([])
});


//-------------------------------------COMMENTAIRES----------------------------------------------------//
// Schéma pour GET /api/jury/comments?movieId=X
export const getJuryCommentsSchema = z.object({
    query: z.object({
        // Tout ce qui vient de l'URL (query) est une string, on vérifie que c'est bien un nombre
        movieId: z.string().regex(/^\d+$/, "Le paramètre movieId doit être un nombre entier valide.")
    })
});

// Schéma pour POST /api/jury/comments
export const postJuryCommentSchema = z.object({
    body: z.object({
        movieId: z.number().int().positive("L'ID du film est invalide."),
        content: z.string()
            .min(2, "La note doit contenir au moins 2 caractères.")
            .max(2000, "La note est trop longue (maximum 2000 caractères.)"),
        isPrivate: z.coerce.number().int().min(0).max(1).default(1)
    })
});

export const putJuryCommentSchema = z.object({
    params: z.object({
        commentId: z.string().regex(/^\d+$/, "Le paramètre commentId doit être un nombre entier valide.")
    }),
    body: z.object({
        content: z.string()
            .min(2, "La note doit contenir au moins 2 caractères.")
            .max(2000, "La note est trop longue (maximum 2000 caractères.)")
            .optional(),
        isPrivate: z.coerce.number().int().min(0).max(1).optional()
    }).refine((data) => data.content !== undefined || data.isPrivate !== undefined, {
        message: "Au moins un champ (content ou isPrivate) doit être fourni."
    })
});

export const deleteJuryCommentSchema = z.object({
    params: z.object({
        commentId: z.string().regex(/^\d+$/, "Le paramètre commentId doit être un nombre entier valide.")
    })
});

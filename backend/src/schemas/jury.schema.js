import { z } from 'zod';

const ALLOWED_STATUS_IDS = [1, 2, 3, 4];

const movieIdSchema = z.coerce
    .number({
        required_error: "L'ID du film est obligatoire.",
        invalid_type_error: "L'ID du film doit etre un nombre."
    })
    .int("L'ID du film doit etre un nombre entier.")
    .positive("L'ID du film doit etre superieur a zero.");

const statusIdSchema = z
    .number({
        required_error: "L'ID du statut est obligatoire.",
        invalid_type_error: "L'ID du statut doit etre un nombre."
    })
    .int("L'ID doit etre un nombre entier.")
    .positive("L'ID doit etre superieur a zero.")
    .refine((value) => ALLOWED_STATUS_IDS.includes(value), {
        message: "Cet ID de statut n'est pas reconnu. Utilisez 1, 2, 3 ou 4."
    });

export const movieIdParamsSchema = z.object({
    id: movieIdSchema
});

export const getMovieByIdSchema = z.object({
    params: movieIdParamsSchema
});

export const updateMovieStatusSchema = z.object({
    params: movieIdParamsSchema,
    body: z.object({
        statusId: statusIdSchema
    })
});

export const movieDetailResponseSchema = z.object({
    id: movieIdSchema,
    title: z.string().min(1, 'Le titre est obligatoire.'),
    synopsis: z.string().nullable(),
    videoUrl: z.string().url('L\'URL de la video est invalide.').nullable(),
    subtitles: z.string().nullable(),
    videofile: z.string().nullable(),
    thumbnail: z.string().nullable(),
    screenshotLink: z.string().nullable(),
    language: z.string().min(1, 'La langue est obligatoire.'),
    createdAt: z.union([z.string(), z.date()]),
    aiTools: z.string().nullable(),
    statusId: statusIdSchema,
    status: z.string().min(1, 'Le statut est obligatoire.'),
    directorName: z.string().min(1, 'Le nom du réalisateur est obligatoire.'),
    directorFirstName: z.string().nullable(),
    directorLastName: z.string().nullable(),
    directorEmail: z.string().email('Email invalide du réalisateur.').nullable(),
    date_of_birth: z.union([z.string(), z.date()]).nullable(),
    address: z.string().nullable(),
    address2: z.string().nullable(),
    postal_code: z.union([z.string(), z.number()]).nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
    director_language: z.string().nullable()
});

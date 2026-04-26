import { z } from 'zod';

const positiveIntSchema = z.coerce
    .number({
        required_error: 'Champ requis.',
        invalid_type_error: 'La valeur doit etre un nombre.',
    })
    .int('La valeur doit etre un entier.')
    .positive('La valeur doit etre strictement positive.');

export const assignMovieSchema = z
    .object({
        body: z
            .object({
                movieId: positiveIntSchema,
                juryId: positiveIntSchema,
            })
            .strict(),
        query: z.object({}).optional(),
        params: z.object({}).optional(),
    })
    .strict();

export const updateAdminMovieStatusSchema = z
    .object({
        body: z
            .object({
                statusId: z
                    .coerce
                    .number({
                        required_error: 'Champ requis.',
                        invalid_type_error: 'La valeur doit etre un nombre.',
                    })
                    .int('La valeur doit etre un entier.')
                    .refine((value) => [1, 2, 3, 4, 5, 6].includes(value), {
                        message: 'Statut invalide.',
                    }),
            })
            .strict(),
        query: z.object({}).optional(),
        params: z
            .object({
                movieId: positiveIntSchema,
            })
            .strict(),
    })
    .strict();

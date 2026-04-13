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

import { z } from 'zod';

const ALLOWED_STATUS_IDS = [1, 2, 3, 4];

export const updateMovieStatusSchema = z.object({
    body: z.object({
        statusId: z.number({
            required_error: "L'ID du statut est obligatoire.",
            invalid_type_error: "L'ID du statut doit etre un nombre."
        })
            .int("L'ID doit etre un nombre entier.")
            .positive("L'ID doit etre superieur a zero.")
            .refine((value) => ALLOWED_STATUS_IDS.includes(value), {
                message: "Cet ID de statut n'est pas reconnu. Utilisez 1, 2, 3 ou 4."
            })
    })
});

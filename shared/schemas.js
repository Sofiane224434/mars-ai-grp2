import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// ------------------------------------- JURY SCHEMAS ----------------------------------------------------//

// const en MAJUSCALE SCREAMING_SNAKE_CASE. car constantes dures, valeurs de configuration globales qui ne changeront jamais

const ALLOWED_STATUS_IDS = [1, 2, 3, 4]; // 1:pending, 2:rejected, 3:pending (legacy), 4:approved

export const updateMovieStatusSchema = z.object({
  body: z.object({
    statusId: z.number({
      required_error: "L'ID du statut est obligatoire.",
      invalid_type_error: "L'ID du statut doit être un nombre."
    })
    .int("L'ID doit être un nombre entier.")
    .positive("L'ID doit être supérieur à zéro.")
    //refine() sert exactement à ça : elle te permet d'écrire ta propre fonction de validation personnalisée.
    .refine((val) => ALLOWED_STATUS_IDS.includes(val), {
      message: "Cet ID de statut n'est pas reconnu. Utilisez 1, 2, 3 ou 4."
    })
  })
});

// Ajouter les futurs schémas ici en dessous RAJOUTER un commentaire avec le nom pour organisation ex: ADMIN ou REALISATEUR... !



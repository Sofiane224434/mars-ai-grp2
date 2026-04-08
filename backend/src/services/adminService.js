import { movieModel } from '../models/movieModel.js';
import { sendCustomEmail } from './email.service.js'; // Import de ton service

export const adminService = {
  // 1. Logique pour récupérer la liste
  async getReviewList() {
    return await movieModel.getMoviesPendingReview();
  },

  async getMovieDetail(movieId) {
    return await movieModel.getMovieDetailForAdmin(movieId);
  },

  // 2. Logique complexe d'envoi d'email
  async processOfficialEmail(movieId, subject, body, senderUserId) {
    if (!senderUserId) {
      const err = new Error("Session invalide: utilisateur introuvable.");
      err.statusCode = 401;
      throw err;
    }

    // A. Vérification en base
    const movie = await movieModel.getMovieWithDirectorInfo(movieId);
    
    if (!movie) {
      const err = new Error("Film introuvable.");
      err.statusCode = 404;
      throw err;
    }

    if (Number(movie.emailAlreadySent) === 1) {
      const err = new Error("L'email officiel a déjà été envoyé pour ce film.");
      err.statusCode = 400;
      throw err;
    }

    // B. Appel à ton service d'email (email.service.js)
    // On passe les paramètres attendus par ta fonction sendCustomEmail
    await sendCustomEmail({
      to: movie.email,
      name: `${movie.firstname} ${movie.lastname}`,
      subject: subject,
      message: body
    });

    // C. Validation finale en base
    await movieModel.logOfficialEmail({
      movieId,
      userId: senderUserId,
      subject,
      body,
    });
    
    return { success: true, message: "Email envoyé et horodaté." };
  }
};
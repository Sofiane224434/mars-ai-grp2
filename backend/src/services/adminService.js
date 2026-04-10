import { movieModel } from '../models/movieModel.js';
import { adminModel } from '../models/adminModel.js'; 
import { sendCustomEmail } from './email.service.js';

export const adminService = {

  async getDashboardStats() {
    
    const [totalMovies, statusCounts, juryProgress, emailsPending] = await Promise.all([
      adminModel.countTotalMovies(),
      adminModel.countMoviesByStatus(),
      adminModel.getJuryProgress(),
      adminModel.countPendingEmails()
    ]);

    const statusMap = { 
      1: 'pending',     
      2: 'rejected',    
      3: 'review',      
      4: 'approved'     
    };

    const defaultStats = { pending: 0, approved: 0, review: 0, rejected: 0 };

    const moviesByStatus = Array.isArray(statusCounts) 
      ? statusCounts.reduce((acc, row) => {
          const key = statusMap[row.status] || statusMap[row.statusId]; 
          if (key) {
            acc[key] = Number(row.count);
          }
          return acc;
        }, { ...defaultStats }) 
      : defaultStats;

    return {
      totalMovies: Number(totalMovies || 0),
      moviesByStatus,
      juryProgress: {
        totalAssigned: Number(juryProgress?.totalAssigned || 0),
        totalEvaluated: Number(juryProgress?.totalEvaluated || 0)
      },
      emailsPending: Number(emailsPending || 0)
    };
  },

 
  async getAllMovies() {
    return await movieModel.getAllAdminMovies();
  },

  async assignMovie(movieId, juryId) {
    return await movieModel.assignMovieToJury(movieId, juryId);
  },

  async getJuryOptions() {
    return await movieModel.getJuryAssignmentOptions();
  },

  // 1. Logique pour récupérer la liste des films à revoir (Review)
  async getReviewList() {
    return await movieModel.getMoviesPendingReview();
  },

  async getMovieDetail(movieId) {
    return await movieModel.getMovieDetailForAdmin(movieId);
  },

  async processOfficialEmail(movieId, subject, body, senderUserId) {
    if (!senderUserId) {
      const err = new Error("Session invalide: utilisateur introuvable.");
      err.statusCode = 401;
      throw err;
    }

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

    await sendCustomEmail({
      to: movie.email,
      name: `${movie.firstname} ${movie.lastname}`,
      subject: subject,
      message: body
    });

    await movieModel.logOfficialEmail({
      movieId,
      userId: senderUserId,
      subject,
      body,
    });

    return { success: true, message: "Email envoyé et horodaté." };
  }
};
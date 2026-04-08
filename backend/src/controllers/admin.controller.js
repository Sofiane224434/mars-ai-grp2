import { issueInvitationForEmail } from "../services/magicAuth.service.js";
import { inviteJurySchema } from "../schemas/auth.schema.js";
import { adminService } from '../services/adminService.js';
import { z } from "zod";

export const inviteJury = async (req, res) => {
    // 1. Validation du body avec Zod
    //    Si emails[] est absent ou contient un email invalide → 400 immédiat
    const parsed = inviteJurySchema.safeParse({ body: req.body });
    if (!parsed.success) {
        return res.status(400).json({
            error: "Payload invalide",
            details: z.treeifyError(parsed.error),
        });
    }

    const { emails, message } = parsed.data.body;

    // 2. On traite chaque email en parallèle avec Promise.allSettled
    //    allSettled (≠ Promise.all) : si un email échoue, les autres continuent quand même
    const results = await Promise.allSettled(
        emails.map((email) =>
            issueInvitationForEmail({ email, customMessage: message })
        )
    );

    const successCount = results.filter((result) => result.status === "fulfilled").length;
    const failedCount = results.length - successCount;

    // Si TOUS les emails ont échoué → 500
    if (successCount === 0) {
        return res.status(500).json({
            error: "Toutes les invitations ont échoué.",
            sent: 0,
            failed: failedCount,
        });
    }

    return res.status(200).json({
        message: "Invitations traitées.",
        sent: successCount,
        failed: failedCount,
    });
};

export const getMoviesForReview = async (req, res) => {
  try {
    const movies = await adminService.getReviewList();
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.error("Erreur Controller GET /review :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur interne." });
  }
};

export const getMovieByIdForAdmin = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    if (!Number.isInteger(movieId) || movieId <= 0) {
      return res.status(400).json({ success: false, message: 'ID de film invalide.' });
    }

    // L'appel au service (qui appelle notre super modèle SQL)
    const movieData = await adminService.getMovieDetail(movieId);

    if (!movieData) {
      return res.status(404).json({ success: false, message: 'Ce film est introuvable.' });
    }

    const directorFirstName = movieData.directorFirstName || '';
    const directorLastName = movieData.directorLastName || '';
    const directorName = `${directorFirstName} ${directorLastName}`.trim() || 'Inconnu';

    // On renvoie TOUTES les données, y compris les jurys et les IA
    return res.status(200).json({
      id: movieData.id,
      title: movieData.title || 'Sans titre',
      synopsis: movieData.synopsis || null,
      videoUrl: movieData.videoUrl || null,
      subtitles: movieData.subtitles || null,
      videofile: movieData.videofile || null,
      thumbnail: movieData.thumbnail || null,
      screenshotLink: movieData.screenshotLink || null,
      language: movieData.language || 'Inconnue',
      description: movieData.description || null,
      prompt: movieData.prompt || null,
      classification: movieData.classification || null,
      title_english: movieData.title_english || null,
      synopsis_english: movieData.synopsis_english || null,
      movie_duration: movieData.movie_duration || null,
      createdAt: movieData.createdAt,
      statusId: movieData.statusId || 1,
      status: movieData.statusLabel || 'En attente',
      directorName,
      directorFirstName: movieData.directorFirstName || null,
      directorLastName: movieData.directorLastName || null,
      directorEmail: movieData.directorEmail || null,
      date_of_birth: movieData.date_of_birth || null,
      address: movieData.address || null,
      address2: movieData.address2 || null,
      postal_code: movieData.postal_code || null,
      city: movieData.city || null,
      country: movieData.country || null,
      director_language: movieData.director_language || null,
      fix_phone: movieData.fix_phone || null,
      mobile_phone: movieData.mobile_phone || null,
      school: movieData.school || null,
      current_job: movieData.current_job || null,
      gender: movieData.gender || null,
      
      // 🚀 LES DEUX LIGNES AJOUTÉES ICI :
      assignedJuries: movieData.assignedJuries || [],
      usedAis: movieData.usedAis || [],
    });
  } catch (error) {
    console.error('Erreur Controller GET /admin/movies/:movieId :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

export const sendOfficialEmail = async (req, res) => {
  try {
    // Extraction propre des données de la requête
    const movieId = req.params.movieId;
    const { subject, body } = req.body;
    const senderUserId = req.user?.id;

    // Appel du Service
    const result = await adminService.processOfficialEmail(movieId, subject, body, senderUserId);

    // Réponse HTTP de succès
    return res.status(200).json(result);

  } catch (error) {
    // Gestion élégante des erreurs remontées par le Service
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      success: false, 
      message: error.message || "Erreur serveur interne." 
    });
  }
};

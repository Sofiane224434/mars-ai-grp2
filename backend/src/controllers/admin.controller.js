import { issueInvitationForEmail } from "../services/magicAuth.service.js";
import { inviteJurySchema } from "../schemas/auth.schema.js";
import { adminService } from '../services/adminService.js';
import { success, z } from "zod";

const TOP50_STATUS_ID = 5;
const TOP50_MAX_COUNT = 50;
const TOP5_STATUS_ID = 6;
const TOP5_MAX_COUNT = 5;

const getPhaseIndexFromRequest = (req) => {
  const rawPhase = req.headers['x-festival-phase-index'];
  const parsed = Number.parseInt(String(rawPhase ?? ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const isJudgmentPhase = (req) => getPhaseIndexFromRequest(req) === 1;
const isTop5Phase = (req) => getPhaseIndexFromRequest(req) === 2;

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

  const { emails, message, subject, body } = parsed.data.body;

  // 2. On traite chaque email en parallèle avec Promise.allSettled
  //    allSettled (≠ Promise.all) : si un email échoue, les autres continuent quand même
  const results = await Promise.allSettled(
    emails.map((email) =>
      issueInvitationForEmail({
        email,
        customMessage: message,
        customSubject: subject,
        customBody: body,
      })
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
      screenshotLink: movieData["scrnshotlinks"] || null,
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
      assignedJuries: movieData.assignedJuries || [],
      usedAis: movieData.usedAis || [],
      publicComments: movieData.publicComments || [],
    });
  } catch (error) {
    console.error('Erreur Controller GET /admin/movies/:movieId :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

export const getAllMoviesForAdmin = async (req, res) => {
  try {
    const movies = await adminService.getAllMovies();
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Erreur Controller GET /admin/movies :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur interne lors de la récupération des films." });
  }
};

export const updateMovieStatusForAdmin = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const { statusId } = req.body;

    if (!Number.isInteger(movieId) || movieId <= 0) {
      return res.status(400).json({ success: false, message: 'ID de film invalide.' });
    }

    const currentStatusId = await adminService.getMovieStatusById(movieId);
    if (currentStatusId === null) {
      return res.status(404).json({ success: false, message: 'Film introuvable.' });
    }

    if (statusId === TOP50_STATUS_ID && !isJudgmentPhase(req) && !isTop5Phase(req)) {
      return res.status(403).json({
        success: false,
        message: 'Le statut Top 50 est disponible uniquement pendant les phases 2 et 3.'
      });
    }

    if (statusId === TOP5_STATUS_ID && !isTop5Phase(req)) {
      return res.status(403).json({
        success: false,
        message: 'Le statut Top 5 est disponible uniquement pendant la phase 3.'
      });
    }

    if (statusId === TOP50_STATUS_ID && currentStatusId !== TOP50_STATUS_ID) {
      const currentTop50Count = await adminService.countMoviesByStatus(TOP50_STATUS_ID);
      if (currentTop50Count >= TOP50_MAX_COUNT) {
        return res.status(409).json({
          success: false,
          message: 'Limite atteinte : le Top 50 contient deja 50 films.'
        });
      }
    }

    if (statusId === TOP5_STATUS_ID && currentStatusId !== TOP5_STATUS_ID) {
      const currentTop5Count = await adminService.countMoviesByStatus(TOP5_STATUS_ID);
      if (currentTop5Count >= TOP5_MAX_COUNT) {
        return res.status(409).json({
          success: false,
          message: 'Limite atteinte : le Top 5 contient deja 5 films.'
        });
      }
    }

    const updateResult = await adminService.updateMovieStatus(movieId, statusId);
    if (updateResult && updateResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Film introuvable ou statut déjà identique.' });
    }

    return res.status(200).json({ success: true, message: 'Statut mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur Controller PUT /admin/movies/:movieId/status :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne lors de la mise à jour du statut.' });
  }
};

export const assignMovieToJuries = async (req, res) => {
  try {
    const { movieId, juryId } = req.body;
    const assignment = await adminService.assignMovie(movieId, juryId);

    return res.status(200).json({
      success: true,
      message: 'Assignation du jury effectuée avec succès.',
      data: assignment,
    });
  } catch (error) {
    if (error.code === 'MOVIE_NOT_FOUND') {
      return res.status(404).json({ success: false, message: error.message });
    }

    if (error.code === 'INVALID_JURY_ID') {
      return res.status(422).json({
        success: false,
        message: error.message,
        invalidJuryId: error.invalidJuryId || null,
      });
    }

    console.error('Erreur Controller POST /movies/assign :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur interne lors de l\'assignation des jurys.',
    });
  }
};

export const getJuryAssignmentOptions = async (req, res) => {
  try {
    const juries = await adminService.getJuryOptions();
    return res.status(200).json({ success: true, data: juries });
  } catch (error) {
    console.error('Erreur Controller GET /movies/juries :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur interne lors de la récupération des jurys.',
    });
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

export const getAdminStats = async (req, res) => {
  try {
    // On appelle la logique métier (le Service)
    const statsData = await adminService.getDashboardStats();

    // On renvoie le JSON avec la structure EXACTE
    return res.status(200).json({
      success: true,
      data: statsData
    });
  } catch (error) {
    console.error("Erreur Controller GET /admin/stats :", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur interne lors du calcul des statistiques."
    });
  }
};


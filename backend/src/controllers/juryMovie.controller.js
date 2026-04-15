import * as JuryMovieModel from '../models/juryMovie.model.js';
import { movieDetailResponseSchema } from '../schemas/jury.schema.js';

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

export const getAssignedMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    let movies;
    if (isTop5Phase(req)) {
      movies = await JuryMovieModel.getAllMoviesForTop5Phase();
    } else if (isJudgmentPhase(req)) {
      movies = await JuryMovieModel.getAllMoviesForJudgmentPhase();
    } else {
      movies = await JuryMovieModel.getAssignedMoviesByUser(userId);
    }

    return res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Erreur lors de la recuperation des films assignes :', error);
    return res.status(500).json({
      success: false,
      message: 'Impossible de recuperer les films assignes.'
    });
  }
};

export const validateMovieStatus = async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    const { statusId } = req.body;
    const userId = req.user.id;

    if (!Number.isInteger(movieId) || movieId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de film invalide.'
      });
    }

    if (!isJudgmentPhase(req) && !isTop5Phase(req)) {
      const isAssigned = await JuryMovieModel.isMovieAssignedToUser(movieId, userId);
      if (!isAssigned) {
        return res.status(403).json({
          success: false,
          message: "Ce film n'est pas assigne a ce membre du jury."
        });
      }
    }

    const currentStatusId = await JuryMovieModel.getMovieStatusById(movieId);
    if (currentStatusId === null) {
      return res.status(404).json({
        success: false,
        message: 'Film introuvable.'
      });
    }

    if (
      isJudgmentPhase(req)
      && statusId === TOP50_STATUS_ID
      && currentStatusId !== TOP50_STATUS_ID
    ) {
      const currentTop50Count = await JuryMovieModel.countMoviesByStatus(TOP50_STATUS_ID);
      if (currentTop50Count >= TOP50_MAX_COUNT) {
        return res.status(409).json({
          success: false,
          message: 'Limite atteinte : le Top 50 contient deja 50 films.'
        });
      }
    }

    if (
      isTop5Phase(req)
      && statusId === TOP5_STATUS_ID
      && currentStatusId !== TOP5_STATUS_ID
    ) {
      const currentTop5Count = await JuryMovieModel.countMoviesByStatus(TOP5_STATUS_ID);
      if (currentTop5Count >= TOP5_MAX_COUNT) {
        return res.status(409).json({
          success: false,
          message: 'Limite atteinte : le Top 5 contient deja 5 films.'
        });
      }
    }

    const updateResult = await JuryMovieModel.updateMovieStatus(movieId, statusId);
    if (updateResult && updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Film introuvable ou statut déjà identique.'
      });
    }

    // PLUS DE BROUILLON D'E-MAIL ICI ! Juste une validation claire.
    return res.status(200).json({
      success: true,
      message: "Statut mis à jour avec succès. L'administrateur a été notifié."
    });

  } catch (error) {
    console.error('Erreur lors de la validation par le jury :', error);
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'enregistrement de la décision."
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const juryId = req.user.id; // Ton token JWT

    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Format d'ID invalide." });
    }

    // 1. Appel au Modèle
    const movieData = await JuryMovieModel.getMovieDetailById(movieId, juryId);

    // 2. Gestion des erreurs métier
    if (!movieData) {
      // Le film n'est pas dans la table `movies`
      return res.status(404).json({ message: "Ce film est introuvable." });
    }

    if (!isJudgmentPhase(req) && !isTop5Phase(req) && !movieData.isAssigned) {
      // Le film existe, mais le LEFT JOIN n'a rien trouvé pour CE juré
      return res.status(403).json({
        message: "Accès interdit : ce film ne fait pas partie de votre sélection."
      });
    }

    // 3. Formatage pour correspondre exactement à ton Front-End React
    const directorFirstName = movieData.directorFirstName || '';
    const directorLastName = movieData.directorLastName || '';
    const directorName = `${directorFirstName} ${directorLastName}`.trim() || 'Inconnu';

    const formattedResponse = {
      id: movieData.id,
      title: movieData.title || 'Sans titre',
      synopsis: movieData.synopsis || null,
      videoUrl: movieData.videoUrl || null,
      subtitles: movieData.subtitles || null,
      videofile: movieData.videofile || null,
      thumbnail: movieData.thumbnail || null,
      screenshotLink: movieData.screenshotLink || null,
      language: movieData.language || 'Inconnue',
      createdAt: movieData.createdAt,
      description: movieData.description || null,
      prompt: movieData.prompt || null,
      classification: movieData.classification || null,
      title_english: movieData.title_english || null,
      synopsis_english: movieData.synopsis_english || null,
      movie_duration: movieData.movie_duration || null,
      aiTools: movieData.aiTools || null,
      usedAis: movieData.usedAis || [],

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
      assignedJuries: movieData.assignedJuries || []
    };

    const validatedResponse = movieDetailResponseSchema.parse(formattedResponse);
    return res.status(200).json(validatedResponse);

  } catch (error) {
    console.error("Erreur GET /jury/movies/:id :", error);
    if (error?.name === 'ZodError') {
      const firstIssue = error?.issues?.[0]?.message;
      return res.status(500).json({
        message: firstIssue || 'Donnees invalides detectees dans la reponse API.'
      });
    }
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
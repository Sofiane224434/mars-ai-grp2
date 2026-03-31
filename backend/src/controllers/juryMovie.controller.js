import * as JuryMovieModel from '../models/juryMovie.model.js';
import { movieDetailResponseSchema } from '../schemas/jury.schema.js';

export const getAssignedMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const movies = await JuryMovieModel.getAssignedMoviesByUser(userId);

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

    const isAssigned = await JuryMovieModel.isMovieAssignedToUser(movieId, userId);
    if (!isAssigned) {
      return res.status(403).json({
        success: false,
        message: "Ce film n'est pas assigne a ce membre du jury."
      });
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

    if (!movieData.isAssigned) {
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
      language: movieData.language || 'Inconnue',
      createdAt: movieData.createdAt,
      aiTools: movieData.aiTools || null,

      statusId: movieData.statusId || 1,
      status: movieData.statusLabel || 'En attente',

      directorName,
      directorFirstName: movieData.directorFirstName || null,
      directorLastName: movieData.directorLastName || null,
      directorEmail: movieData.directorEmail || null
    };

    const validatedResponse = movieDetailResponseSchema.parse(formattedResponse);
    return res.status(200).json(validatedResponse);

  } catch (error) {
    console.error("Erreur GET /jury/movies/:id :", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
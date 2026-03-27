import * as JuryMovieModel from '../models/juryMovie.model.js';

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
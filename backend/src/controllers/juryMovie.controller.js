import JuryMovieModel from '../models/juryMovie.model.js';

// MISSION 1 : Renvoyer la liste des films (Route GET)
export const getAssignedMovies = async (req, res) => {
  try {
    // Magie du middleware requireAuth : l'ID du jury est déjà dans req.user !
    // Pas besoin de le passer dans l'URL, c'est 100% sécurisé.
    const juryId = req.user.id; 
    
    // On demande au modèle d'aller chercher les films de ce jury
    const movies = await JuryMovieModel.getMoviesByJuryId(juryId);
    
    // On renvoie les films au Front-End avec un code de succès 200
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Erreur getAssignedMovies:", error);
    return res.status(500).json({ error: "Erreur lors de la récupération des films." });
  }
};

// MISSION 2 : Mettre à jour le statut d'un film (Route PUT)
export const updateMovieStatus = async (req, res) => {
  try {
    // 1. On récupère l'ID du film depuis l'URL (ex: /api/jury/movies/15/status -> id = 15)
    const movieId = req.params.id;
    
    // 2. On récupère le fameux statusId (Magie de Zod : on est CERTAIN que c'est 1, 2, 3 ou 4)
    const { statusId } = req.body; 
    
    // 3. On récupère l'ID du jury depuis son token
    const juryId = req.user.id;

    // On donne tout ça au modèle pour qu'il mette à jour la base de données MySQL
    const updatedMovie = await JuryMovieModel.updateStatus(movieId, juryId, statusId);

    // Tout s'est bien passé, on prévient le Front-End !
    return res.status(200).json({
      message: "Statut du film mis à jour avec succès.",
      movie: updatedMovie
    });
  } catch (error) {
    console.error("Erreur updateMovieStatus:", error);
    return res.status(500).json({ error: "Erreur lors de la modification du statut." });
  }
};
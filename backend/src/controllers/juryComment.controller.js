import { getCommentsByMovieAndUser, createComment } from '../models/juryComment.model.js';

// GET /api/jury/comments?movieId=123
export const getJuryComments = async (req, res) => {
  try {
    const juryId = req.user.id; // Issu de ton token JWT
    
    // Le Front-End enverra le movieId en paramètre de requête (query)
    const movieId = req.query.movieId ? parseInt(req.query.movieId, 10) : null;

    if (!movieId) {
      return res.status(400).json({ message: "L'ID du film (movieId) est requis en paramètre." });
    }

    const comments = await getCommentsByMovieAndUser(movieId, juryId);
    return res.status(200).json(comments);

  } catch (error) {
    console.error("Erreur GET /jury/comments :", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// POST /api/jury/comments
export const postJuryComment = async (req, res) => {
  try {
    const juryId = req.user.id; // Issu de ton token JWT
    const { movieId, content } = req.body;

    // Validation des données entrantes
    if (!movieId || !content || content.trim() === '') {
      return res.status(400).json({ message: "L'ID du film et le contenu de la note sont requis." });
    }

    // Sauvegarde en base de données
    const newComment = await createComment(movieId, juryId, content.trim());
    
    // Code 201 (Created) : Standard REST pour une création réussie
    return res.status(201).json(newComment);

  } catch (error) {
    console.error("Erreur POST /jury/comments :", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
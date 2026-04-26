import {
  createComment,
  deleteCommentByIdAndUser,
  getCommentsByMovieAndUser,
  updateCommentByIdAndUser,
} from '../models/juryComment.model.js';

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
    const { movieId, content, isPrivate = 1 } = req.body;
    const normalizedIsPrivate = Number(isPrivate) !== 0;
    const normalizedContent = String(content || '').trim();

    // Validation des données entrantes
    if (!movieId || normalizedContent === '') {
      return res.status(400).json({ message: "L'ID du film et le contenu de la note sont requis." });
    }

    // Sauvegarde en base de données
    const newComment = await createComment(movieId, juryId, normalizedContent, normalizedIsPrivate);
    
    // Code 201 (Created) : Standard REST pour une création réussie
    return res.status(201).json(newComment);

  } catch (error) {
    console.error("Erreur POST /jury/comments :", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// PUT /api/jury/comments/:commentId
export const putJuryComment = async (req, res) => {
  try {
    const juryId = req.user.id;
    const commentId = Number.parseInt(String(req.params.commentId || ''), 10);
    const { content, isPrivate } = req.body;

    if (!Number.isInteger(commentId) || commentId <= 0) {
      return res.status(400).json({ message: "L'ID du commentaire est invalide." });
    }

    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body, 'content')) {
      const normalizedContent = String(content || '').trim();
      if (!normalizedContent) {
        return res.status(400).json({ message: 'Le contenu de la note est requis.' });
      }
      updates.content = normalizedContent;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'isPrivate')) {
      updates.isPrivate = Number(isPrivate) !== 0;
    }

    const updatedComment = await updateCommentByIdAndUser(commentId, juryId, updates);

    if (!updatedComment) {
      return res.status(404).json({ message: 'Commentaire introuvable.' });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Erreur PUT /jury/comments/:commentId :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// DELETE /api/jury/comments/:commentId
export const deleteJuryComment = async (req, res) => {
  try {
    const juryId = req.user.id;
    const commentId = Number.parseInt(String(req.params.commentId || ''), 10);

    if (!Number.isInteger(commentId) || commentId <= 0) {
      return res.status(400).json({ message: "L'ID du commentaire est invalide." });
    }

    const deleted = await deleteCommentByIdAndUser(commentId, juryId);
    if (!deleted) {
      return res.status(404).json({ message: 'Commentaire introuvable.' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Erreur DELETE /jury/comments/:commentId :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
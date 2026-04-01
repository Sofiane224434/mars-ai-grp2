import { query } from '../config/db.js';

// Récupérer les notes d'un juré pour un film spécifique
export const getCommentsByMovieAndUser = async (movieId, userId) => {
  const sql = `
    SELECT 
      id, 
      comment AS content, 
      movie_id AS movieId 
    FROM comments 
    WHERE movie_id = ? AND user_id = ?
    ORDER BY id ASC
  `;
  // On trie par ID ASC pour avoir la plus ancienne en haut, la plus récente en bas (ordre chronologique classique)
  return await query(sql, [movieId, userId]);
};

// Ajouter une nouvelle note
export const createComment = async (movieId, userId, content) => {
  const sql = `
    INSERT INTO comments (movie_id, user_id, comment) 
    VALUES (?, ?, ?)
  `;
  const result = await query(sql, [movieId, userId, content]);
  
  // On retourne l'objet fraîchement créé (insertId est fourni par mysql2)
  return { id: result.insertId, movieId, content };
};
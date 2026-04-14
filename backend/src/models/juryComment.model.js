import { query } from '../config/db.js';

// Récupérer les notes d'un juré pour un film spécifique
export const getCommentsByMovieAndUser = async (movieId, userId) => {
  const sql = `
    SELECT 
      id, 
      comment AS content, 
      movie_id AS movieId,
      isprivate AS isPrivate
    FROM comments 
    WHERE movie_id = ? AND user_id = ?
    ORDER BY id ASC
  `;
  // On trie par ID ASC pour avoir la plus ancienne en haut, la plus récente en bas (ordre chronologique classique)
  const rows = await query(sql, [movieId, userId]);

  return rows.map((row) => ({
    ...row,
    isPrivate: Number(row.isPrivate) !== 0,
  }));
};

export const getPublicCommentsByMovie = async (movieId) => {
  const sql = `
    SELECT
      c.id,
      c.comment AS content,
      c.movie_id AS movieId,
      c.isprivate AS isPrivate,
      u.email AS authorEmail
    FROM comments c
    LEFT JOIN users u ON u.id = c.user_id
    WHERE c.movie_id = ? AND COALESCE(c.isprivate, 1) = 0
    ORDER BY c.id ASC
  `;

  const rows = await query(sql, [movieId]);

  return rows.map((row) => ({
    ...row,
    isPrivate: Number(row.isPrivate) !== 0,
  }));
};

// Ajouter une nouvelle note
export const createComment = async (movieId, userId, content, isPrivate = true) => {
  const sql = `
    INSERT INTO comments (movie_id, user_id, comment, isprivate) 
    VALUES (?, ?, ?, ?)
  `;
  const isPrivateValue = Number(isPrivate) !== 0 ? 1 : 0;
  const result = await query(sql, [movieId, userId, content, isPrivateValue]);
  
  // On retourne l'objet fraîchement créé (insertId est fourni par mysql2)
  return { id: result.insertId, movieId, content, isPrivate: isPrivateValue !== 0 };
};
import { query } from '../config/db.js';

// Recuperer les films assignes a un membre du jury
export const getAssignedMoviesByUser = async (userId) => {
  const sql = `
    SELECT
      m.id,
      m.title_original,
      m.title_english,
      m.language,
      m.classification,
      m.status AS statusId,
      s.status AS statusLabel,
      m.created_at,
      m.updated_at
    FROM users_movies um
    INNER JOIN movies m ON m.id = um.movie_id
    LEFT JOIN status s ON s.id = m.status
    WHERE um.user_id = ?
    ORDER BY m.updated_at DESC, m.id DESC
  `;

  return await query(sql, [userId]);
};

// Verifier que le film est bien assigne a ce jury
export const isMovieAssignedToUser = async (movieId, userId) => {
  const sql = `
    SELECT 1
    FROM users_movies
    WHERE movie_id = ? AND user_id = ?
    LIMIT 1
  `;

  const rows = await query(sql, [movieId, userId]);
  return rows.length > 0;
};

// Mettre à jour le statut du film
export const updateMovieStatus = async (movieId, statusId) => {
  const sql = "UPDATE movies SET status = ? WHERE id = ?";
  return await query(sql, [statusId, movieId]);
};


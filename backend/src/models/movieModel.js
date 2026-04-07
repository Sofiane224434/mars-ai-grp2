import { query } from "../config/db.js";

export const movieModel = {
  // 1. Récupérer la liste d'attente
  async getMoviesPendingReview() {
    const sql = `
      SELECT
        m.id,
        m.title_original,
        m.title_original AS title,
        m.status AS statusId,
        d.firstname AS directorFirstName,
        d.lastname AS directorLastName,
        d.email
      FROM movies m
      JOIN director_profile d ON m.id = d.movie_id
      WHERE m.status IN (2, 3, 4)
        AND NOT EXISTS (
          SELECT 1
          FROM email e
          WHERE e.movie_id = m.id
            AND e.sent_at IS NOT NULL
        )
      ORDER BY m.updated_at DESC, m.id DESC
    `;
    return await query(sql);
  },

  // 2. Récupérer un film précis pour l'envoi d'email
  async getMovieWithDirectorInfo(movieId) {
    const sql = `
      SELECT
        m.id,
        d.email,
        d.firstname,
        d.lastname,
        EXISTS (
          SELECT 1
          FROM email e
          WHERE e.movie_id = m.id
            AND e.sent_at IS NOT NULL
        ) AS emailAlreadySent
      FROM movies m
      JOIN director_profile d ON m.id = d.movie_id
      WHERE m.id = ?
      LIMIT 1
    `;
    const rows = await query(sql, [movieId]);
    return rows[0] || null;
  },

  // 3. Journaliser l'email envoyé et horodatage dans la table email
  async logOfficialEmail({ movieId, userId, subject, body }) {
    const sql = `
      INSERT INTO email (object, message, user_id, movie_id, sent_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    return await query(sql, [subject, body, userId, movieId]);
  }
};
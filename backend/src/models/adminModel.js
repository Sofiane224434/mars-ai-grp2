// 📁 backend/src/models/adminModel.js
import { query } from '../config/db.js';

const countTotalMovies = async () => {

  const rows = await query(`SELECT COUNT(id) as total FROM movies`);
  return rows[0].total;
};

const countMoviesByStatus = async () => {
  const rows = await query(`
    SELECT status, COUNT(id) as count 
    FROM movies 
    GROUP BY status
  `);
  return rows;
};

const getJuryProgress = async () => {
  const rows = await query(`
    SELECT 
      COUNT(um.movie_id) as totalAssigned,
      SUM(CASE WHEN m.status != 1 THEN 1 ELSE 0 END) as totalEvaluated
    FROM users_movies um
    LEFT JOIN movies m ON um.movie_id = m.id
  `);
  return rows[0];
};

const countPendingEmails = async () => {
  const rows = await query(`
    SELECT COUNT(DISTINCT m.id) as count
    FROM movies m
    LEFT JOIN email e ON m.id = e.movie_id AND e.sent_at IS NOT NULL
    WHERE m.status != 1
      AND e.id IS NULL
  `);
  return rows[0].count;
};

export const adminModel = {
  countTotalMovies,
  countMoviesByStatus,
  getJuryProgress,
  countPendingEmails
};
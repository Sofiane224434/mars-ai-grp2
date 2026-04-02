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

// Récupérer les détails d'un film ET vérifier s'il est assigné au juré
export const getMovieDetailById = async (movieId, userId) => {
  const sql = `
    SELECT
      m.id,
      m.title_original AS title,
      m.synopsis_original AS synopsis,
      m.youtube_url AS videoUrl,
      m.subtitles,
      m.videofile,
      m.thumbnail,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      m.language,
      (
        SELECT GROUP_CONCAT(DISTINCT al.ai_name ORDER BY al.ai_name SEPARATOR ', ')
        FROM used_ai ua
        LEFT JOIN ai_list al ON al.id = ua.ai_name
        WHERE ua.movie_id = m.id
      ) AS aiTools,
      m.status AS statusId,
      s.status AS statusLabel,
      m.created_at AS createdAt,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      dp.email AS directorEmail,
      dp.date_of_birth,
      dp.address,
      dp.address2,
      dp.postal_code,
      dp.city,
      dp.country,
      dp.director_language,
      um.user_id AS isAssigned
    FROM movies m
    LEFT JOIN users_movies um ON m.id = um.movie_id AND um.user_id = ?
    LEFT JOIN status s ON s.id = m.status
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.id = ?
  `;

  // Le paramètre 1 (userId) remplace le premier ?, le paramètre 2 (movieId) le second ?
  const rows = await query(sql, [userId, movieId]);
  
  // Retourne la ligne si le film existe, sinon undefined
  return rows.length > 0 ? rows[0] : null;
};


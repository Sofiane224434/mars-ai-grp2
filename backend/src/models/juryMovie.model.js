import { query } from '../config/db.js';

// Recuperer les films assignes a un membre du jury
export const getAssignedMoviesByUser = async (userId) => {
  const sql = `
    SELECT
      m.id,
      m.title_original,
      m.title_original AS title,
      m.description,
      m.title_english,
      m.language,
      m.classification,
      m.thumbnail,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      m.status AS statusId,
      m.top5_rank AS top5Rank,
      s.status AS statusLabel,
      s.status AS status,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      TRIM(CONCAT(COALESCE(dp.firstname, ''), ' ', COALESCE(dp.lastname, ''))) AS directorName,
      m.created_at,
      m.updated_at
    FROM users_movies um
    INNER JOIN movies m ON m.id = um.movie_id
    LEFT JOIN status s ON s.id = m.status
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE um.user_id = ?
    ORDER BY m.id ASC
  `;

  return await query(sql, [userId]);
};

// Recuperer tous les films pour la phase de jugement (sans contrainte d'assignation)
export const getAllMoviesForJudgmentPhase = async () => {
  const sql = `
    SELECT
      m.id,
      m.title_original,
      m.title_original AS title,
      m.description,
      m.title_english,
      m.language,
      m.classification,
      m.thumbnail,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      m.status AS statusId,
      m.top5_rank AS top5Rank,
      s.status AS statusLabel,
      s.status AS status,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      TRIM(CONCAT(COALESCE(dp.firstname, ''), ' ', COALESCE(dp.lastname, ''))) AS directorName,
      m.created_at,
      m.updated_at
    FROM movies m
    LEFT JOIN status s ON s.id = m.status
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.status IN (4, 5)
    ORDER BY m.id ASC
  `;

  return await query(sql);
};

// Recuperer tous les films du Top 50 pour la phase de selection du Top 5
export const getAllMoviesForTop5Phase = async () => {
  const sql = `
    SELECT
      m.id,
      m.title_original,
      m.title_original AS title,
      m.description,
      m.title_english,
      m.language,
      m.classification,
      m.thumbnail,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      m.status AS statusId,
      m.top5_rank AS top5Rank,
      s.status AS statusLabel,
      s.status AS status,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      TRIM(CONCAT(COALESCE(dp.firstname, ''), ' ', COALESCE(dp.lastname, ''))) AS directorName,
      m.created_at,
      m.updated_at
    FROM movies m
    LEFT JOIN status s ON s.id = m.status
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.status IN (5, 6)
    ORDER BY m.id ASC
  `;

  return await query(sql);
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
  if (statusId === 6) {
    const sqlKeepRank = 'UPDATE movies SET status = ? WHERE id = ?';
    return await query(sqlKeepRank, [statusId, movieId]);
  }

  const sqlResetRank = 'UPDATE movies SET status = ?, top5_rank = NULL WHERE id = ?';
  return await query(sqlResetRank, [statusId, movieId]);
};

export const getMovieTop5RankById = async (movieId) => {
  const sql = 'SELECT top5_rank AS top5Rank FROM movies WHERE id = ? LIMIT 1';
  const rows = await query(sql, [movieId]);
  return rows?.[0]?.top5Rank ?? null;
};

export const getMovieIdByTop5Rank = async (rank) => {
  const sql = 'SELECT id FROM movies WHERE status = 6 AND top5_rank = ? LIMIT 1';
  const rows = await query(sql, [rank]);
  return rows?.[0]?.id ?? null;
};

export const updateMovieTop5Rank = async (movieId, rank) => {
  const sql = 'UPDATE movies SET top5_rank = ? WHERE id = ?';
  return await query(sql, [rank, movieId]);
};

export const getMovieStatusById = async (movieId) => {
  const sql = 'SELECT status FROM movies WHERE id = ? LIMIT 1';
  const rows = await query(sql, [movieId]);
  return rows?.[0]?.status ?? null;
};

export const countMoviesByStatus = async (statusId) => {
  const sql = 'SELECT COUNT(*) AS count FROM movies WHERE status = ?';
  const rows = await query(sql, [statusId]);
  return Number(rows?.[0]?.count || 0);
};

// Récupérer les détails d'un film ET vérifier s'il est assigné au juré
export const getMovieDetailById = async (movieId, userId) => {
  const sql = `
    SELECT
      m.id,
      m.title_original AS title,
      m.title_english,
      m.synopsis_original AS synopsis,
      m.synopsis_english,
      m.youtube_url AS videoUrl,
      m.subtitles,
      m.videofile,
      m.thumbnail,
      m.classification,
      m.language,
      m.description,
      m.prompt,
      (
        SELECT GROUP_CONCAT(DISTINCT al.ai_name ORDER BY al.ai_name SEPARATOR ', ')
        FROM used_ai ua
        LEFT JOIN ai_list al ON al.id = ua.ai_name
        WHERE ua.movie_id = m.id
      ) AS aiTools,
      m.movie_duration,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('ai_name', al.ai_name, 'category', ua.category))
        FROM used_ai ua
        LEFT JOIN ai_list al ON al.id = ua.ai_name
        WHERE ua.movie_id = m.id
      ) AS usedAisRaw,
      m.status AS statusId,
      m.top5_rank AS top5Rank,
      s.status AS statusLabel,
      m.created_at AS createdAt,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      dp.email AS directorEmail,
      dp.gender,
      dp.date_of_birth,
      dp.address,
      dp.address2,
      dp.postal_code,
      dp.city,
      dp.country,
      dp.director_language,
      dp.fix_phone,
      dp.mobile_phone,
      dp.school,
      dp.current_job,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', u.id, 'name', u.email))
        FROM users_movies um2
        JOIN users u ON u.id = um2.user_id
        WHERE um2.movie_id = m.id AND u.status = 'jury'
      ) AS assignedJuriesRaw,
      um.user_id AS isAssigned,
      scr.scrnshotlinks
    FROM movies m
    LEFT JOIN(
          SELECT movie_id, 
          JSON_ARRAYAGG(link) as scrnshotlinks
          FROM screenshots
          WHERE movie_id = ?
          GROUP BY movie_id
          ) AS scr
          ON scr.movie_id = m.id
    LEFT JOIN users_movies um ON m.id = um.movie_id AND um.user_id = ?
    LEFT JOIN status s ON s.id = m.status
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.id = ?
  `;

  // let tempsql = `
  // SELECT
  //       m.id,
  //       m.title_original AS title,
  //       m.synopsis_original AS synopsis,
  //       m.youtube_url AS videoUrl,
  //       m.subtitles,
  //       m.videofile,
  //       m.thumbnail,
  //       m.language,
  //       m.status AS statusId,
  //       s.status AS statusLabel,
  //       m.created_at AS createdAt,
  //       m.description,
  //       m.prompt,
  //       m.classification,
  //       m.title_english,
  //       m.synopsis_english,
  //       m.movie_duration,
  //       dp.firstname AS directorFirstName,
  //       dp.lastname AS directorLastName,
  //       dp.email AS directorEmail,
  //       dp.date_of_birth,
  //       dp.address,
  //       dp.address2,
  //       dp.postal_code,
  //       dp.city,
  //       dp.country,
  //       dp.director_language,
  //       dp.fix_phone,
  //       dp.mobile_phone,
  //       dp.school,
  //       dp.current_job,
  //       dp.gender,
  //       scr.scrnshotlinks
  //     FROM movies m
  //     LEFT JOIN(
  //         SELECT movie_id, 
  //         JSON_ARRAYAGG(link) as scrnshotlinks
  //         FROM screenshots
  //         WHERE movie_id = ?
  //         GROUP BY movie_id
  //         ) AS scr
  //         ON scr.movie_id = m.id
  //     LEFT JOIN status s ON s.id = m.status
  //     LEFT JOIN director_profile dp ON dp.movie_id = m.id
  //     WHERE m.id = ?;
  // `

  // Le paramètre 1 (userId) remplace le premier ?, le paramètre 2 (movieId) le second ?
  const rows = await query(sql, [movieId, userId, movieId]);

  // Retourne la ligne si le film existe, sinon undefined
  const row = rows.length > 0 ? rows[0] : null;
  if (!row) return null;

  let usedAis = [];
  if (row.usedAisRaw) {
    usedAis = typeof row.usedAisRaw === 'string' ? JSON.parse(row.usedAisRaw) : row.usedAisRaw;
  }

  let assignedJuries = [];
  if (row.assignedJuriesRaw) {
    assignedJuries = typeof row.assignedJuriesRaw === 'string' ? JSON.parse(row.assignedJuriesRaw) : row.assignedJuriesRaw;
  }

  return {
    ...row,
    usedAis,
    assignedJuries,
  };
};


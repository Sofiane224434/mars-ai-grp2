import pool, { query } from "../config/db.js";

// Recuperer les films publics (Top 50 ou Top 5 selon la phase)
export const getPublicMovies = async (phaseIndex) => {
  // A partir de la phase publique, on garde Top 50 et Top 5 accessibles.
  const statusFilter = [5, 6];
  const placeholders = statusFilter.map(() => '?').join(', ');

  const sql = `
    SELECT
      m.id,
      m.title_original AS title,
      m.status AS statusId,
      m.top5_rank AS top5Rank,
      m.description,
      m.title_english,
      m.language,
      m.thumbnail,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      TRIM(CONCAT(COALESCE(dp.firstname, ''), ' ', COALESCE(dp.lastname, ''))) AS directorName
    FROM movies m
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.status IN (${placeholders})
    ORDER BY
      CASE WHEN m.status = 6 THEN 0 ELSE 1 END ASC,
      CASE WHEN m.status = 6 AND m.top5_rank IS NULL THEN 1 ELSE 0 END ASC,
      CASE WHEN m.status = 6 THEN m.top5_rank ELSE NULL END ASC,
      m.id ASC
  `;

  return await query(sql, statusFilter);
};

export const getPublicMovieDetail = async (movieId, phaseIndex) => {
  const statusFilter = [5, 6];
  const placeholders = statusFilter.map(() => '?').join(', ');

  const sqlMovie = `
    SELECT
      m.id,
      m.title_original AS title,
      m.title_english,
      m.synopsis_original AS synopsis,
      m.synopsis_english,
      m.description,
      m.youtube_url AS videoUrl,
      m.top5_rank AS top5Rank,
      m.thumbnail,
      m.language,
      m.classification,
      (
        SELECT sc.link
        FROM screenshots sc
        WHERE sc.movie_id = m.id
        ORDER BY sc.id ASC
        LIMIT 1
      ) AS screenshotLink,
      dp.firstname AS directorFirstName,
      dp.lastname AS directorLastName,
      TRIM(CONCAT(COALESCE(dp.firstname, ''), ' ', COALESCE(dp.lastname, ''))) AS directorName
    FROM movies m
    LEFT JOIN director_profile dp ON dp.movie_id = m.id
    WHERE m.id = ? AND m.status IN (${placeholders})
    LIMIT 1
  `;

  const rows = await query(sqlMovie, [movieId, ...statusFilter]);
  const movie = rows[0];

  if (!movie) {
    return null;
  }

  const sqlUsedAis = `
    SELECT al.ai_name, ua.category
    FROM used_ai ua
    JOIN ai_list al ON ua.ai_name = al.id
    WHERE ua.movie_id = ?
    ORDER BY ua.id ASC
  `;

  const usedAis = await query(sqlUsedAis, [movieId]);

  return {
    ...movie,
    usedAis,
  };
};

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
      LEFT JOIN director_profile d ON d.id = (
        SELECT dp.id
        FROM director_profile dp
        WHERE dp.movie_id = m.id
        ORDER BY dp.id ASC
        LIMIT 1
      )
      WHERE m.status IN (2, 3, 4, 5, 6)
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

  async getMovieDetailForAdmin(movieId) {
    // 1. Récupérer les informations principales du film et du réalisateur
    const sqlMovie = `
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
        m.status AS statusId,
        s.status AS statusLabel,
        m.created_at AS createdAt,
        m.description,
        m.prompt,
        m.classification,
        m.title_english,
        m.synopsis_english,
        m.movie_duration,
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
        dp.fix_phone,
        dp.mobile_phone,
        dp.school,
        dp.current_job,
        dp.gender
      FROM movies m
      LEFT JOIN status s ON s.id = m.status
      LEFT JOIN director_profile dp ON dp.movie_id = m.id
      WHERE m.id = ?
      LIMIT 1
    `;

    const rows = await query(sqlMovie, [movieId]);
    const movie = rows[0];

    // Si le film n'existe pas, on arrête tout de suite
    if (!movie) return null;

    // 2. Récupérer la liste des jurys assignés à ce film
    // (Dans ton schéma SQL, la table users n'a que l'email, on renvoie donc ça)
    const sqlJuries = `
      SELECT u.id, u.email AS name 
      FROM users u
      JOIN users_movies um ON u.id = um.user_id
      WHERE um.movie_id = ? AND u.status = 'jury'
    `;
    const assignedJuries = await query(sqlJuries, [movieId]);

    // 3. Récupérer la liste des IA utilisées
    const sqlAis = `
      SELECT al.ai_name, ua.category
      FROM used_ai ua
      JOIN ai_list al ON ua.ai_name = al.id
      WHERE ua.movie_id = ?
    `;
    const usedAis = await query(sqlAis, [movieId]);

    const sqlPublicComments = `
      SELECT
        c.id,
        c.comment AS content,
        c.movie_id AS movieId,
        c.isprivate AS isPrivate,
        u.email AS authorEmail
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.movie_id = ?
        AND COALESCE(c.isprivate, 1) = 0
      ORDER BY c.id ASC
    `;
    const publicCommentsRows = await query(sqlPublicComments, [movieId]);
    const publicComments = publicCommentsRows.map((row) => ({
      ...row,
      isPrivate: Number(row.isPrivate) !== 0,
    }));

    // 4. On assemble l'objet final comme ton frontend l'attend
    return {
      ...movie,
      assignedJuries: assignedJuries,
      usedAis: usedAis,
      publicComments
    };
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
  },

  // Récupérer tous les films pour le dashboard admin
  async getAllAdminMovies() {
    const sql = `
      SELECT
        m.id,
        m.title_original AS title,
        m.description,
        m.thumbnail,
        m.status AS statusId,
        s.status AS statusCode,
        m.created_at AS createdAt,
        dp.firstname AS directorFirstName,
        dp.lastname AS directorLastName,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', u.id, 'name', u.email))
          FROM users_movies um
          JOIN users u ON um.user_id = u.id
          WHERE um.movie_id = m.id AND u.status = 'jury'
        ) AS assignedJuriesRaw
      FROM movies m
      LEFT JOIN status s ON s.id = m.status
      LEFT JOIN director_profile dp ON m.id = dp.movie_id
      ORDER BY m.id DESC
    `;

    const rows = await query(sql);

    // On formate proprement les données à la sortie de la base
    return rows.map(row => {
      // Selon le driver MySQL utilisé, le JSON ressort en string ou déjà parsé
      let parsedJuries = [];
      if (row.assignedJuriesRaw) {
        parsedJuries = typeof row.assignedJuriesRaw === 'string'
          ? JSON.parse(row.assignedJuriesRaw)
          : row.assignedJuriesRaw;
      }

      return {
        id: row.id,
        title: row.title || 'Sans titre',
        description: row.description || null,
        thumbnail: row.thumbnail,
        statusId: row.statusId,
        evaluationStatus: this.mapEvaluationStatus(row.statusCode),
        createdAt: row.createdAt,
        directorName: `${row.directorFirstName || ''} ${row.directorLastName || ''}`.trim() || 'Inconnu',
        assignedJuries: parsedJuries
      };
    });
  },

  mapEvaluationStatus(statusCode) {
    const normalized = String(statusCode || '').toLowerCase();
    const STATUS_MAP = {
      review: 'en cours d\'évaluation',
      approved: 'validée',
      pending: 'à revoir',
      rejected: 'refusée',
    };

    return STATUS_MAP[normalized] || 'en cours d\'évaluation';
  },

  async assignMovieToJury(movieId, juryId) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [movieRows] = await connection.execute(
        'SELECT id FROM movies WHERE id = ? LIMIT 1',
        [movieId]
      );

      if (!movieRows.length) {
        const error = new Error('Film introuvable.');
        error.code = 'MOVIE_NOT_FOUND';
        throw error;
      }

      const [juryRows] = await connection.execute(
        `SELECT id FROM users WHERE status = 'jury' AND id = ? LIMIT 1`,
        [juryId]
      );

      if (!juryRows.length) {
        const error = new Error('juryId invalide.');
        error.code = 'INVALID_JURY_ID';
        error.invalidJuryId = juryId;
        throw error;
      }

      const [currentAssignmentRows] = await connection.execute(
        'SELECT user_id FROM users_movies WHERE movie_id = ?',
        [movieId]
      );

      const currentJuryIds = currentAssignmentRows.map((row) => Number(row.user_id));
      const hasSingleSameAssignment =
        currentJuryIds.length === 1 && currentJuryIds[0] === Number(juryId);

      let action = 'created';

      if (hasSingleSameAssignment) {
        action = 'unchanged';
      } else {
        action = currentJuryIds.length === 0 ? 'created' : 'reassigned';

        // Normalise les anciennes donnees pour garantir 1 film = 1 jury.
        await connection.execute('DELETE FROM users_movies WHERE movie_id = ?', [movieId]);
        await connection.execute(
          'INSERT INTO users_movies (movie_id, user_id) VALUES (?, ?)',
          [movieId, juryId]
        );
      }

      await connection.commit();

      return {
        movieId,
        assignedJuryId: Number(juryId),
        action,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getJuryAssignmentOptions() {
    const sql = `
      SELECT
        u.id,
        u.email,
        COUNT(um.movie_id) AS assignedMoviesCount
      FROM users u
      LEFT JOIN users_movies um ON um.user_id = u.id
      WHERE u.status = 'jury'
      GROUP BY u.id, u.email
      ORDER BY assignedMoviesCount ASC, u.email ASC
    `;

    const rows = await query(sql);
    return rows.map((row) => ({
      id: Number(row.id),
      email: row.email,
      assignedMoviesCount: Number(row.assignedMoviesCount || 0),
    }));
  },

  async createMovieSubmission({
    movie,
    directorProfile,
    usedAi = [],
    soundData = [],
    socials = [],
    screenshotLinks = [],
  }) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [movieResult] = await connection.execute(
        `INSERT INTO movies (
          title_original,
          subtitles,
          videofile,
          language,
          description,
          prompt,
          status,
          synopsis_original,
          classification,
          thumbnail,
          created_at,
          updated_at,
          title_english,
          synopsis_english,
          youtube_url,
          movie_duration
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?)` ,
        [
          movie.title_original,
          movie.subtitles,
          movie.videofile,
          movie.language,
          movie.description,
          movie.prompt,
          movie.status,
          movie.synopsis_original,
          movie.classification,
          movie.thumbnail,
          movie.title_english,
          movie.synopsis_english,
          movie.youtube_url,
          movie.movie_duration,
        ],
      );

      const movieId = Number(movieResult.insertId);

      await connection.execute(
        `INSERT INTO director_profile (
          movie_id,
          email,
          firstname,
          lastname,
          address,
          address2,
          postal_code,
          city,
          country,
          marketting,
          date_of_birth,
          gender,
          fix_phone,
          mobile_phone,
          school,
          current_job,
          director_language
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
        [
          movieId,
          directorProfile.email,
          directorProfile.firstname,
          directorProfile.lastname,
          directorProfile.address,
          directorProfile.address2,
          directorProfile.postal_code,
          directorProfile.city,
          directorProfile.country,
          directorProfile.marketting,
          directorProfile.date_of_birth,
          directorProfile.gender,
          directorProfile.fix_phone,
          directorProfile.mobile_phone,
          directorProfile.school,
          directorProfile.current_job,
          directorProfile.director_language,
        ],
      );

      for (const screenshotLink of screenshotLinks) {
        await connection.execute(
          `INSERT INTO screenshots (movie_id, link) VALUES (?, ?)`,
          [movieId, screenshotLink],
        );
      }

      for (const social of socials) {
        await connection.execute(
          `INSERT INTO socials (movie_id, social_name, social_link) VALUES (?, ?, ?)`,
          [movieId, social.social_name, social.social_link],
        );
      }

      for (const sound of soundData) {
        await connection.execute(
          `INSERT INTO sound_data (sound, type, movie_id) VALUES (?, ?, ?)`,
          [sound.sound, sound.type, movieId],
        );
      }

      for (const usedAiItem of usedAi) {
        const [existingAiRows] = await connection.execute(
          `SELECT id FROM ai_list WHERE LOWER(ai_name) = LOWER(?) LIMIT 1`,
          [usedAiItem.ai_name],
        );

        let aiId = Number(existingAiRows?.[0]?.id || 0);

        if (!aiId) {
          const [createdAi] = await connection.execute(
            `INSERT INTO ai_list (ai_name, included) VALUES (?, 1)`,
            [usedAiItem.ai_name],
          );
          aiId = Number(createdAi.insertId);
        }

        await connection.execute(
          `INSERT INTO used_ai (movie_id, ai_name, category) VALUES (?, ?, ?)`,
          [movieId, aiId, usedAiItem.category],
        );
      }

      await connection.commit();
      return { movieId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async postMovie(moviedata) {
    const sql_movies = `
      INSERT INTO movies (
        classification,
        created_at,
        description,
        language,
        movie_duration,
        prompt,
        status,
        subtitles,
        synopsis_english,
        synopsis_original,
        thumbnail,
        title_english,
        title_original,
        updated_at,
        videofile,
        youtube_url
      ) VALUES (
        :classification,
        NOW(),
        :description,
        :language,
        :movie_duration,
        :prompt,
        :status,
        :subtitles,
        :synopsis_english,
        :synopsis_original,
        :thumbnail,
        :title_english,
        :title_original,
        NOW(),
        :videofile,
        :youtube_url
      )
    `;

    const result = await query(sql_movies, moviedata);
    return { id: Number(result.insertId), movieinfo: moviedata };
  },

  async getMovieStatusById(movieId) {
    const sql = 'SELECT status FROM movies WHERE id = ? LIMIT 1';
    const rows = await query(sql, [movieId]);
    return rows?.[0]?.status ?? null;
  },

  async countMoviesByStatus(statusId) {
    const sql = 'SELECT COUNT(*) AS count FROM movies WHERE status = ?';
    const rows = await query(sql, [statusId]);
    return Number(rows?.[0]?.count || 0);
  },

  async updateMovieStatus(movieId, statusId) {
    if (statusId === 6) {
      const sqlKeepRank = 'UPDATE movies SET status = ? WHERE id = ?';
      return await query(sqlKeepRank, [statusId, movieId]);
    }

    const sqlResetRank = 'UPDATE movies SET status = ?, top5_rank = NULL WHERE id = ?';
    return await query(sqlResetRank, [statusId, movieId]);
  }
};


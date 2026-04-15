import dotenv from "dotenv";
import pool, { query } from "../src/config/db.js";

dotenv.config();

const SEED_MARKER = "Film de test #%genere automatiquement%";

const findOdysseeSourceMovie = async () => {
  const sourceRows = await query(
    "SELECT * FROM movies WHERE LOWER(REPLACE(REPLACE(title_original, 'é', 'e'), 'è', 'e')) LIKE '%odyssee ia%' ORDER BY id DESC LIMIT 1",
  );

  return sourceRows[0] || null;
};

const run = async () => {
  try {
    const source = await findOdysseeSourceMovie();

    if (!source) {
      throw new Error("Film source Odyssee IA introuvable.");
    }

    // Regle 1: les films seedes non assignes restent en pending (status = 1).
    const [statusResult] = await pool.execute(
      `UPDATE movies m
       LEFT JOIN users_movies um ON um.movie_id = m.id
       SET m.status = 1
       WHERE m.description LIKE ?
         AND um.movie_id IS NULL`,
      [SEED_MARKER],
    );

    // Regle 2: la duplication doit utiliser la video source d'Odyssee IA.
    const [mediaResult] = await pool.execute(
      `UPDATE movies
       SET videofile = ?,
           subtitles = ?,
           thumbnail = ?,
           language = ?,
           youtube_url = ?,
           movie_duration = ?
       WHERE description LIKE ?`,
      [
        source.videofile,
        source.subtitles,
        source.thumbnail,
        source.language,
        source.youtube_url,
        source.movie_duration,
        SEED_MARKER,
      ],
    );

    const [summaryRows] = await pool.execute(
      `SELECT
        COUNT(*) AS totalSeeded,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS seededPending,
        SUM(CASE WHEN status IN (5, 6) THEN 1 ELSE 0 END) AS seededTopRanks
       FROM movies
       WHERE description LIKE ?`,
      [SEED_MARKER],
    );

    const [videoRows] = await pool.execute(
      `SELECT videofile, COUNT(*) AS count
       FROM movies
       WHERE description LIKE ?
       GROUP BY videofile
       ORDER BY count DESC`,
      [SEED_MARKER],
    );

    console.log("Source appliquee:", {
      id: source.id,
      title: source.title_original,
      videofile: source.videofile,
    });
    console.log("Lignes status mises a jour:", statusResult.affectedRows);
    console.log("Lignes media mises a jour:", mediaResult.affectedRows);
    console.log("Resume films seedes:", summaryRows[0]);
    console.log("Distribution videofile (films seedes):", videoRows);
  } catch (error) {
    console.error("Echec normalisation films seedes:", error?.message || error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();

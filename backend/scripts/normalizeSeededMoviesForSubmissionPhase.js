import dotenv from "dotenv";
import pool, { query } from "../src/config/db.js";

dotenv.config();

const SEED_MARKER = "Film de test #%genere automatiquement%";
const THUMBNAIL_POOL = [
  "https://picsum.photos/id/1018/1200/675",
  "https://picsum.photos/id/1025/1200/675",
  "https://picsum.photos/id/1035/1200/675",
  "https://picsum.photos/id/1041/1200/675",
  "https://picsum.photos/id/1050/1200/675",
  "https://picsum.photos/id/1067/1200/675",
  "https://picsum.photos/id/1074/1200/675",
  "https://picsum.photos/id/1084/1200/675",
  "https://picsum.photos/id/1080/1200/675",
];

const pickThumbnail = (index) =>
  THUMBNAIL_POOL[index % THUMBNAIL_POOL.length] || "https://picsum.photos/id/1005/1200/675";

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
           language = ?,
           youtube_url = ?,
           movie_duration = ?
       WHERE description LIKE ?`,
      [
        source.videofile,
        source.subtitles,
        source.language,
        source.youtube_url,
        source.movie_duration,
        SEED_MARKER,
      ],
    );

    const seededRows = await query(
      `SELECT id
       FROM movies
       WHERE description LIKE ?
       ORDER BY id ASC`,
      [SEED_MARKER],
    );

    for (let i = 0; i < seededRows.length; i += 1) {
      const movieId = Number(seededRows[i].id);
      await pool.execute("UPDATE movies SET thumbnail = ? WHERE id = ?", [
        pickThumbnail(i),
        movieId,
      ]);
    }

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

    const [thumbnailRows] = await pool.execute(
      `SELECT thumbnail, COUNT(*) AS count
       FROM movies
       WHERE description LIKE ?
       GROUP BY thumbnail
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
    console.log("Lignes miniature mises a jour:", seededRows.length);
    console.log("Resume films seedes:", summaryRows[0]);
    console.log("Distribution videofile (films seedes):", videoRows);
    console.log("Distribution thumbnails (films seedes):", thumbnailRows);
  } catch (error) {
    console.error("Echec normalisation films seedes:", error?.message || error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();

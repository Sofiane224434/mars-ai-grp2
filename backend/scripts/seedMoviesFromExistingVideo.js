import dotenv from "dotenv";
import pool, { query } from "../src/config/db.js";

dotenv.config();

const DEFAULT_TARGET_TOTAL = 50;
const DEFAULT_SOURCE_TITLE = "Odyssee IA";
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

const titleFragments = [
  "Echos",
  "Neon",
  "Mirage",
  "Signal",
  "Pulse",
  "Aube",
  "Orbite",
  "Rive",
  "Code",
  "Sillage",
  "Altitude",
  "Matrice",
  "Synthe",
  "Prisme",
  "Chronique",
  "Spectre",
  "Horizon",
  "Lueur",
  "Paradoxe",
  "Impulse",
];

const cityFragments = [
  "Marseille",
  "Arles",
  "Lyon",
  "Toulouse",
  "Paris",
  "Nantes",
  "Nice",
  "Lille",
  "Bordeaux",
  "Rennes",
];

const parseIntArg = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const targetTotal = parseIntArg(process.argv[2], DEFAULT_TARGET_TOTAL);
const sourceMovieIdArg = parseIntArg(process.argv[3], null);

const pickThumbnail = (index) =>
  THUMBNAIL_POOL[index % THUMBNAIL_POOL.length] || "https://picsum.photos/id/1005/1200/675";

const findSourceMovie = async () => {
  if (sourceMovieIdArg) {
    const sourceMovieRows = await query(
      "SELECT * FROM movies WHERE id = ? LIMIT 1",
      [sourceMovieIdArg],
    );
    return sourceMovieRows[0] || null;
  }

  const preferredRows = await query(
    `SELECT *
     FROM movies
     WHERE LOWER(REPLACE(REPLACE(title_original, 'é', 'e'), 'è', 'e')) LIKE ?
     ORDER BY id DESC
     LIMIT 1`,
    [`%${DEFAULT_SOURCE_TITLE.toLowerCase()}%`],
  );

  if (preferredRows[0]) {
    return preferredRows[0];
  }

  const fallbackRows = await query("SELECT * FROM movies ORDER BY id DESC LIMIT 1");
  return fallbackRows[0] || null;
};

const buildMoviePayload = (sourceMovie, index) => {
  const year = 2020 + (index % 7);
  const mainTitle = titleFragments[index % titleFragments.length];
  const secondaryTitle = cityFragments[index % cityFragments.length];
  const variant = index + 1;

  const titleOriginal = `${mainTitle} ${secondaryTitle} ${variant}`;
  const titleEnglish = `${mainTitle} ${year} - ${variant}`;

  return {
    title_original: titleOriginal,
    subtitles: sourceMovie.subtitles,
    videofile: sourceMovie.videofile,
    language: sourceMovie.language || "Francais",
    description:
      `Film de test #${variant} genere automatiquement pour simuler un catalogue public realiste.` +
      ` Cette entree reutilise la video source afin de valider l'affichage, la pagination et les filtres.`,
    prompt:
      `Prompt de test #${variant}: narration courte sur ${mainTitle.toLowerCase()} et l'IA dans ${secondaryTitle}.`,
    // Regle metier: les films seedes restent en attente tant qu'ils ne sont pas assignes a un jury.
    status: 1,
    synopsis_original:
      `Synopsis test #${variant}: une histoire breve se deroule entre ${secondaryTitle} et un futur assiste par IA.`,
    classification: sourceMovie.classification || "Tout public",
    thumbnail: pickThumbnail(index),
    title_english: titleEnglish,
    synopsis_english:
      `Test synopsis #${variant}: a short story unfolding between ${secondaryTitle} and an AI-assisted future.`,
    youtube_url: sourceMovie.youtube_url,
    movie_duration: sourceMovie.movie_duration || "00:01:00",
  };
};

const buildDirectorPayload = (sourceDirector, movieId, index) => {
  const variant = index + 1;

  return {
    movie_id: movieId,
    email:
      sourceDirector?.email || `director${variant}@example.com`,
    firstname: sourceDirector?.firstname || `Director${variant}`,
    lastname: sourceDirector?.lastname || `Sample${variant}`,
    address: sourceDirector?.address || "12 rue du Test",
    address2: sourceDirector?.address2 || "",
    postal_code: sourceDirector?.postal_code || "13000",
    city: sourceDirector?.city || "Marseille",
    country: sourceDirector?.country || "France",
    marketting: sourceDirector?.marketting || "oui",
    date_of_birth: sourceDirector?.date_of_birth || "1990-01-01",
    gender: sourceDirector?.gender || "mr",
    fix_phone: sourceDirector?.fix_phone || "0102030405",
    mobile_phone: sourceDirector?.mobile_phone || "0607080910",
    school: sourceDirector?.school || "La Plateforme",
    current_job: sourceDirector?.current_job || "Realisateur",
    director_language: sourceDirector?.director_language || "Francais",
  };
};

const run = async () => {
  const connection = await pool.getConnection();

  try {
    const countRows = await query("SELECT COUNT(*) AS total FROM movies");
    const currentTotal = Number(countRows[0]?.total || 0);

    if (currentTotal >= targetTotal) {
      console.log(
        `Aucune insertion necessaire: ${currentTotal} films deja presents (objectif ${targetTotal}).`,
      );
      return;
    }

    const toCreate = targetTotal - currentTotal;

    const sourceMovie = await findSourceMovie();

    if (!sourceMovie) {
      throw new Error("Aucun film source trouve pour la duplication.");
    }

    const sourceDirectorRows = await query(
      "SELECT * FROM director_profile WHERE movie_id = ? ORDER BY id ASC LIMIT 1",
      [sourceMovie.id],
    );

    const sourceDirector = sourceDirectorRows[0] || null;

    await connection.beginTransaction();

    let created = 0;

    for (let i = 0; i < toCreate; i += 1) {
      const payload = buildMoviePayload(sourceMovie, currentTotal + i);

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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?)`,
        [
          payload.title_original,
          payload.subtitles,
          payload.videofile,
          payload.language,
          payload.description,
          payload.prompt,
          payload.status,
          payload.synopsis_original,
          payload.classification,
          payload.thumbnail,
          payload.title_english,
          payload.synopsis_english,
          payload.youtube_url,
          payload.movie_duration,
        ],
      );

      const movieId = Number(movieResult.insertId);
      const directorPayload = buildDirectorPayload(sourceDirector, movieId, currentTotal + i);

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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          directorPayload.movie_id,
          directorPayload.email,
          directorPayload.firstname,
          directorPayload.lastname,
          directorPayload.address,
          directorPayload.address2,
          directorPayload.postal_code,
          directorPayload.city,
          directorPayload.country,
          directorPayload.marketting,
          directorPayload.date_of_birth,
          directorPayload.gender,
          directorPayload.fix_phone,
          directorPayload.mobile_phone,
          directorPayload.school,
          directorPayload.current_job,
          directorPayload.director_language,
        ],
      );

      created += 1;
    }

    await connection.commit();

    const afterRows = await query("SELECT COUNT(*) AS total FROM movies");
    const finalTotal = Number(afterRows[0]?.total || 0);

    console.log(
      `Seed termine: ${created} films crees via duplication de la video source (movie_id=${sourceMovie.id}, titre=${sourceMovie.title_original}).`,
    );
    console.log(`Total films actuel: ${finalTotal}`);
    console.log(`Commande: npm run seed:movies50`);
  } catch (error) {
    await connection.rollback();
    console.error("Echec du seed films:", error?.message || error);
    process.exitCode = 1;
  } finally {
    connection.release();
    await pool.end();
  }
};

run();

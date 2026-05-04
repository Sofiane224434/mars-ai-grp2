import path from "node:path";
import { fileURLToPath } from "node:url";
import { getFileStream } from "../config/s3.js";
import { uploadVideoToYouTube } from "../config/youtube.js";
import { movieModel } from "../models/movieModel.js";
import { getPublicMovieDetail, getPublicMovies } from "../models/movieModel.js";
import fs from "fs";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.resolve(__dirname, "../../uploads");
const youtubeUrlPattern = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i;

const parseJsonField = (rawValue, fallbackValue, fieldName) => {
  if (rawValue == null || rawValue === "") {
    return fallbackValue;
  }

  if (typeof rawValue === "object") {
    return rawValue;
  }

  const tryParse = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const normalizedValue = String(rawValue).trim();

  const directParsed = tryParse(normalizedValue);
  if (directParsed !== null) {
    return directParsed;
  }

  // Tolere les payloads encapsules entre quotes ou echappes en multipart.
  const withoutOuterQuotes =
    (normalizedValue.startsWith("\"") && normalizedValue.endsWith("\"")) ||
      (normalizedValue.startsWith("'") && normalizedValue.endsWith("'"))
      ? normalizedValue.slice(1, -1)
      : normalizedValue;

  const unescapedCandidate = withoutOuterQuotes.replace(/\\"/g, '"');

  const secondPass = tryParse(unescapedCandidate);
  if (secondPass !== null) {
    return secondPass;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    const error = new Error(`Le champ ${fieldName} doit contenir un JSON valide.`);
    error.code = "BAD_JSON";
    throw error;
  }
};

const toPublicUploadPath = (absolutePath) => {
  if (!absolutePath) {
    return "";
  }

  const relativePath = path.relative(uploadsRoot, absolutePath).replace(/\\/g, "/");
  return `/uploads/${relativePath}`;
};

const toMySqlTime = (secondsValue) => {
  const parsedSeconds = Number(secondsValue);
  if (!Number.isFinite(parsedSeconds) || parsedSeconds < 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(parsedSeconds);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const normalizeGender = (rawGender) => {
  const value = String(rawGender || "").trim().toLowerCase();

  if (value === "m" || value === "mr" || value === "male" || value === "homme") {
    return "mr";
  }

  if (value === "f" || value === "mme" || value === "female" || value === "femme") {
    return "mme";
  }

  return "iel";
};

const normalizeUsedAi = (rawUsedAi) => {
  if (!Array.isArray(rawUsedAi)) {
    return [];
  }

  const allowedCategories = new Set(["script", "movie", "postprod"]);
  const uniqueKeys = new Set();

  return rawUsedAi
    .map((item) => ({
      ai_name: String(item?.ai_name || "").trim(),
      category: String(item?.category || "").trim().toLowerCase(),
    }))
    .filter((item) => item.ai_name && allowedCategories.has(item.category))
    .filter((item) => {
      const dedupeKey = `${item.ai_name.toLowerCase()}::${item.category}`;
      if (uniqueKeys.has(dedupeKey)) {
        return false;
      }
      uniqueKeys.add(dedupeKey);
      return true;
    });
};

const normalizeSoundData = (rawSoundData) => {
  if (!Array.isArray(rawSoundData)) {
    return [];
  }

  return rawSoundData
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .map((sound) => ({
      sound,
      type: "soundbank",
    }));
};

const normalizeSocials = (rawSocials) => {
  if (!Array.isArray(rawSocials)) {
    return [];
  }

  return rawSocials
    .map((item) => ({
      social_name: String(item?.social_name || "").trim(),
      social_link: String(item?.social_link || "").trim(),
    }))
    .filter((item) => item.social_name && item.social_link);
};

const getTextValue = (value, fallback = "") => {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
};

export const addMovie = async (req, res) => {
  const files = req.files || {};
  const videoFile = files.video_file?.[0] || null;
  const thumbnailFile = files.thumbnail_file?.[0] || null;
  const subtitlesFile = files.subtitles_file?.[0] || null;
  const screenshotFiles = Array.isArray(files.screenshot_files) ? files.screenshot_files : [];

  if (!videoFile) {
    return res.status(400).json({ error: "Le fichier video est obligatoire." });
  }

  if (!thumbnailFile) {
    return res.status(400).json({ error: "La miniature est obligatoire." });
  }

  try {
    const directorProfileRaw = parseJsonField(req.body.director_profile_json, null, "director_profile_json");
    const usedAiRaw = parseJsonField(req.body.used_ai_json, [], "used_ai_json");
    const soundDataRaw = parseJsonField(req.body.sound_data_json, [], "sound_data_json");
    const socialsRaw = parseJsonField(req.body.socials_json, [], "socials_json");

    if (!directorProfileRaw || typeof directorProfileRaw !== "object" || Array.isArray(directorProfileRaw)) {
      return res.status(400).json({ error: "Le profil realisateur est invalide." });
    }

    const titleOriginal = getTextValue(req.body.title_original);
    const description = getTextValue(req.body.description);
    const synopsisOriginal = getTextValue(req.body.synopsis_original);
    const synopsisEnglish = getTextValue(req.body.synopsis_english);

    if (!titleOriginal || !description || !synopsisOriginal || !synopsisEnglish) {
      return res.status(400).json({
        error: "Les champs film obligatoires sont manquants.",
        required: ["title_original", "description", "synopsis_original", "synopsis_english"],
      });
    }

    const parsedDirectorProfile = {
      email: getTextValue(directorProfileRaw.email),
      firstname: getTextValue(directorProfileRaw.firstname),
      lastname: getTextValue(directorProfileRaw.lastname),
      address: getTextValue(directorProfileRaw.address),
      address2: getTextValue(directorProfileRaw.address2),
      postal_code: getTextValue(directorProfileRaw.postal_code).slice(0, 5),
      city: getTextValue(directorProfileRaw.city),
      country: getTextValue(directorProfileRaw.country),
      marketting: getTextValue(directorProfileRaw.marketting, "inconnu"),
      date_of_birth: getTextValue(directorProfileRaw.date_of_birth),
      gender: normalizeGender(directorProfileRaw.gender),
      fix_phone: getTextValue(directorProfileRaw.fix_phone) || null,
      mobile_phone: getTextValue(directorProfileRaw.mobile_phone),
      school: getTextValue(directorProfileRaw.school),
      current_job: getTextValue(directorProfileRaw.current_job),
      director_language: getTextValue(directorProfileRaw.director_language),
    };

    const requiredDirectorFields = [
      "email",
      "firstname",
      "lastname",
      "address",
      "postal_code",
      "city",
      "country",
      "date_of_birth",
      "mobile_phone",
      "school",
      "current_job",
      "director_language",
    ];

    const missingDirectorFields = requiredDirectorFields.filter((fieldName) => !parsedDirectorProfile[fieldName]);
    if (missingDirectorFields.length > 0) {
      return res.status(400).json({
        error: "Des champs realisateur obligatoires sont manquants.",
        missingFields: missingDirectorFields,
      });
    }

    const youtubeFallbackUrl = getTextValue(req.body.youtube_link_input);
    const youtubePrivacyStatus = process.env.YT_UPLOAD_PRIVACY || "unlisted";

    let youtubeResult = null;
    let youtubeWarning = null;

    try {
      youtubeResult = await uploadVideoToYouTube({
        filePath: videoFile.path,
        title: titleOriginal,
        description,
        privacyStatus: youtubePrivacyStatus,
      });
    } catch (error) {
      youtubeWarning = error?.message || "Echec upload YouTube.";

      if (!youtubeFallbackUrl || !youtubeUrlPattern.test(youtubeFallbackUrl)) {
        return res.status(500).json({
          error: "L'upload YouTube a echoue et aucun lien de secours valide n'a ete fourni.",
          details: youtubeWarning,
          provider: error?.provider || "youtube",
          providerStatus: error?.status || null,
          providerReason: error?.reason || null,
        });
      }
    }

    const youtubeUrl = youtubeResult?.youtubeUrl || youtubeFallbackUrl;
    if (!youtubeUrl) {
      return res.status(400).json({
        error: "Impossible de determiner l'URL YouTube finale pour ce film.",
      });
    }

    const submissionPayload = {
      movie: {
        title_original: titleOriginal,
        subtitles: subtitlesFile ? toPublicUploadPath(subtitlesFile.path) : "",
        videofile: toPublicUploadPath(videoFile.path),
        language: getTextValue(req.body.language, "Francais"),
        description,
        prompt: getTextValue(req.body.prompt, "Prompt non renseigne."),
        status: 1,
        synopsis_original: synopsisOriginal,
        classification: getTextValue(req.body.classification, "hybrid"),
        thumbnail: toPublicUploadPath(thumbnailFile.path),
        title_english: getTextValue(req.body.title_english, titleOriginal),
        synopsis_english: synopsisEnglish,
        youtube_url: youtubeUrl,
        movie_duration: toMySqlTime(req.body.movie_duration_seconds),
      },
      directorProfile: parsedDirectorProfile,
      usedAi: normalizeUsedAi(usedAiRaw),
      soundData: normalizeSoundData(soundDataRaw),
      socials: normalizeSocials(socialsRaw),
      screenshotLinks: screenshotFiles.map((file) => toPublicUploadPath(file.path)).filter(Boolean),
    };

    const createdMovie = await movieModel.createMovieSubmission(submissionPayload);

    return res.status(201).json({
      message: "Film envoyé avec succes.",
      data: {
        movieId: createdMovie.movieId,
        youtubeUrl,
        youtubeVideoId: youtubeResult?.videoId || null,
        localVideoPath: submissionPayload.movie.videofile,
        localThumbnailPath: submissionPayload.movie.thumbnail,
        screenshotCount: submissionPayload.screenshotLinks.length,
        youtubeWarning,
      },
    });
  } catch (error) {
    if (error.code === "BAD_JSON") {
      return res.status(400).json({ error: error.message });
    }

    console.error("Erreur soumission film:", error);
    return res.status(500).json({
      error: "Erreur interne pendant l'enregistrement du film.",
      details: error?.message || "Erreur inconnue.",
    });
  }
};

export const getMovieImage = async (req, res) => {
  try {
    const key = decodeURIComponent(req.query.key || "");

    if (!key) {
      return res.status(400).json({ error: "Parametre key manquant" });
    }

    const readStream = getFileStream(key);

    readStream.on("error", (err) => {
      console.error("Erreur stream S3:", err);

      if (!res.headersSent) {
        if (err.code === "NoSuchKey") {
          return res.status(404).json({ error: "Fichier introuvable sur S3" });
        }
        return res.status(500).json({ error: "Erreur de recuperation du fichier depuis S3" });
      }
    });

    return readStream.pipe(res);
  } catch (error) {
    console.error("Erreur de recuperation du fichier depuis S3:", error);
    return res.status(500).json({ error: "Erreur de recuperation du fichier depuis S3" });
  }
};

export const getPublicMoviesList = async (req, res) => {
  try {
    const rawPhase = req.headers['x-festival-phase-index'];
    const phaseIndex = Number.parseInt(String(rawPhase ?? ''), 10);

    if (Number.isNaN(phaseIndex) || phaseIndex < 2) {
      return res.status(200).json({ success: true, data: [] });
    }

    const movies = await getPublicMovies(phaseIndex);
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.error('Erreur lors de la recuperation des films publics :', error);
    return res.status(500).json({
      success: false,
      message: 'Impossible de recuperer les films.'
    });
  }
};

export const getPublicMovieDetailById = async (req, res) => {
  try {
    const rawPhase = req.headers['x-festival-phase-index'];
    const phaseIndex = Number.parseInt(String(rawPhase ?? ''), 10);
    const movieId = Number.parseInt(String(req.params.movieId ?? ''), 10);

    if (!Number.isInteger(movieId) || movieId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Identifiant de film invalide.'
      });
    }

    if (Number.isNaN(phaseIndex) || phaseIndex < 2) {
      return res.status(404).json({
        success: false,
        message: 'Film introuvable.'
      });
    }

    const movie = await getPublicMovieDetail(movieId, phaseIndex);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Film introuvable.'
      });
    }

    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    console.error('Erreur lors de la recuperation du detail film public :', error);
    return res.status(500).json({
      success: false,
      message: 'Impossible de recuperer le detail du film.'
    });
  }
};

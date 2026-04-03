import fs from "fs";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

// Variables minimales necessaires pour authentifier le backend
// et uploader des videos via YouTube Data API v3.
const REQUIRED_YT_ENV_VARS = [
  "YT_CLIENT_ID",
  "YT_CLIENT_SECRET",
  "YT_REDIRECT_URI",
  "YT_REFRESH_TOKEN",
];

// Verification centralisee de la configuration.
// On prefere lever une erreur explicite plutot qu'un echec obscur plus tard.
const assertYouTubeConfig = () => {
  const missing = REQUIRED_YT_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Configuration YouTube manquante: ${missing.join(", ")}`);
  }
};

// Construit un client OAuth2 pret a appeler l'API YouTube,
// avec le refresh token stocke en backend.
const getOAuthClient = () => {
  assertYouTubeConfig();

  const oauth2Client = new google.auth.OAuth2(
    process.env.YT_CLIENT_ID,
    process.env.YT_CLIENT_SECRET,
    process.env.YT_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YT_REFRESH_TOKEN,
  });

  return oauth2Client;
};

// Upload une video locale vers YouTube.
// filePath: chemin temporaire multer (backend/uploads/...)
// privacyStatus: unlisted recommande en phase de moderation/relecture.
export const uploadVideoToYouTube = async ({
  filePath,
  title,
  description,
  privacyStatus = "unlisted",
}) => {
  // 1) Initialisation du client API YouTube
  const oauth2Client = getOAuthClient();
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  // 2) Appel videos.insert avec metadata + flux binaire du fichier
  let response;
  try {
    response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus,
        },
      },
      media: {
        body: fs.createReadStream(filePath),
      },
    });
  } catch (error) {
    const status = error?.response?.status || null;
    const apiMessage = error?.response?.data?.error?.message || error?.message || "Erreur YouTube inconnue";
    const apiReason = error?.response?.data?.error?.errors?.[0]?.reason || null;

    const enhancedError = new Error(
      apiReason ? `${apiMessage} (reason: ${apiReason})` : apiMessage
    );
    enhancedError.status = status;
    enhancedError.reason = apiReason;
    enhancedError.provider = "youtube";
    throw enhancedError;
  }

  // 3) On exige un id video pour considerer l'upload reussi
  const videoId = response?.data?.id;
  if (!videoId) {
    throw new Error("Aucun videoId renvoye par YouTube.");
  }

  // 4) Payload normalise renvoye au controleur
  return {
    videoId,
    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    privacyStatus,
  };
};

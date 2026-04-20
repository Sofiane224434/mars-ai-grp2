import { uploadFile, getFileStream } from "../config/s3.js";
import { uploadVideoToYouTube } from "../config/youtube.js";
import fs from "fs";
import { promisify } from "util";
import { movieModel } from "../models/movieModel.js";

const unlinkFile = promisify(fs.unlink);

export const addMovie = async (req, res) => {
  console.log("controller received movie...");
  console.log("files with multer check", req.files);
  console.log(req.body);
  const moviedata = req.body;

  try {
    //moviedata.movies.thumbnail = "dummy thumbnail link";
    //moviedata.movies.videofile = "dummy link for videofile";
    console.log(moviedata.videofile);
    const moviesent = movieModel.postMovie(moviedata);

    res.status(201).json({ message: 'Film envoyé', moviesent });
  } catch (err) {
    console.log(err);
  }
}

// export const addMovie = async (req, res) => {
//   console.log("controller received movie...");
//   console.log(req.body);
//   const moviedata = req.body;
//   // Fichier temporaire cree par multer (upload multipart/form-data).
//   const file = req.file;
//   // Utile pour diagnostiquer rapidement l'etape exacte en echec.
//   let currentStep = "validation";
//   let s3Result = null;
//   let s3Warning = null;

//   try {
//     moviedata.movies.thumbnail = "dummy thumbnail link";
//     moviedata.movies.videofile = "dummy link for videofile";
//     const moviesent = movieModel.postMovie(moviedata);

//     res.status(201).json({ message: 'Film envoyé', moviesent });
//   } catch (err) {
//     console.log(err);
//   }

//   try {
//     // 1) Verification minimale du payload fichier
//     if (!file) {
//       return res.status(400).json({ error: "Aucun fichier téléchargé" });
//     }

//     // 2) Metadata de base pour YouTube (fallbacks defensifs)
//     const title = (req.body?.title || file.originalname || "Video MarsAI").trim();
//     const description = (req.body?.description || "Soumission video MarsAI").trim();
//     const privacyStatus = process.env.YT_UPLOAD_PRIVACY || "unlisted";

//     // 3) Upload vers S3 (optionnel pour cette branche)
//     // Si S3 est mal configure ou indisponible, on continue le flow YouTube.
//     currentStep = "upload_s3";
//     try {
//       s3Result = await uploadFile(file);
//     } catch (s3Error) {
//       s3Warning = s3Error?.message || "S3 indisponible";
//       console.warn("Upload S3 ignore (mode fallback YouTube):", s3Warning);
//     }

//     // 4) Upload vers YouTube pour verification basique + futur player embed
//     currentStep = "upload_youtube";
//     const youtubeResult = await uploadVideoToYouTube({
//       filePath: file.path,
//       title,
//       description,
//       privacyStatus,
//     });

//     // TODO: sauvegarder les metadonnees du film + s3Key/s3Location + youtubeVideoId en base MySQL

//     if (s3Result) {
//       console.log("Statut du chargement sur S3:", s3Result);
//     } else {
//       console.log("Statut du chargement sur S3: ignore (fallback YouTube)");
//     }
//     console.log("Statut du chargement sur YouTube:", youtubeResult);

//     // 5) Reponse enrichie pour faciliter le branchement front et debug produit
//     return res.status(201).json({
//       message: s3Result
//         ? "Film uploadé sur S3 et YouTube"
//         : "Film uploadé sur YouTube (S3 indisponible)",
//       s3Enabled: Boolean(s3Result),
//       s3Warning,
//       s3Location: s3Result?.Location || null,
//       s3Key: s3Result?.Key || null,
//       youtubeVideoId: youtubeResult.videoId,
//       youtubeUrl: youtubeResult.youtubeUrl,
//       youtubeEmbedUrl: youtubeResult.embedUrl,
//       youtubePrivacyStatus: youtubeResult.privacyStatus,
//     });
//   } catch (error) {
//     // Gestion d'erreur contextualisee (validation, upload_s3, upload_youtube)
//     console.error(`Erreur lors de l'etape ${currentStep}:`, error);
//     return res.status(500).json({
//       error: "Erreur de chargement video (S3/YouTube)",
//       step: currentStep,
//       provider: error?.provider || null,
//       providerStatus: error?.status || null,
//       providerReason: error?.reason || null,
//       details: error?.message || "Erreur inconnue",
//     });
//   } finally {
//     // Nettoyage local systematique pour eviter l'accumulation de fichiers sur le serveur.
//     // Le cleanup ne doit jamais casser la reponse utilisateur.
//     if (file?.path) {
//       try {
//         await unlinkFile(file.path);
//       } catch (cleanupError) {
//         // Non bloquant pour l'utilisateur, mais utile en log serveur
//         console.warn("Impossible de supprimer le fichier temporaire:", cleanupError);
//       }
//     }
//   }
// };

export const getMovieImage = async (req, res) => {
  try {
    const key = decodeURIComponent(req.query.key || "");

    if (!key) {
      return res.status(400).json({ error: "Paramètre key manquant" });
    }

    const readStream = getFileStream(key);

    readStream.on("error", (err) => {
      console.error("Erreur stream S3:", err);

      if (!res.headersSent) {
        if (err.code === "NoSuchKey") {
          return res.status(404).json({ error: "Fichier introuvable sur S3" });
        }
        return res.status(500).json({ error: "Erreur de récupération du fichier depuis S3" });
      }
    });

    return readStream.pipe(res);
  } catch (error) {
    console.error("Erreur de récupération du fichier depuis S3:", error);
    return res.status(500).json({ error: "Erreur de récupération du fichier depuis S3" });
  }
};

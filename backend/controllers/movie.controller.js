import { uploadFile, getFileStream } from "../config/s3.js";
import fs from "fs";
import { promisify } from "util";

const unlinkFile = promisify(fs.unlink);

export const addMovie = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Aucun fichier téléchargé" });
    }

    // Upload vers S3
    const result = await uploadFile(file);

    // Nettoyage du fichier temporaire local (multer)
    try {
      await unlinkFile(file.path);
    } catch (cleanupError) {
      // Non bloquant pour l'utilisateur, mais utile en log serveur
      console.warn("Impossible de supprimer le fichier temporaire:", cleanupError);
    }

    // TODO: sauvegarder les métadonnées du film + s3Key/s3Location en base MySQL

    console.log("Statut du chargement sur S3:", result);

    return res.status(201).json({
      message: "Film uploadé sur S3",
      s3Location: result.Location,
      s3Key: result.Key,
    });
  } catch (error) {
    console.error("Erreur lors du chargement sur S3:", error);
    return res.status(500).json({ error: "Erreur de chargement sur S3" });
  }
};

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

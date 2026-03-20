import { uploadFile, getFileStream } from "../config/s3.js"; // Import mis à jour pour getFileStream
import fs from "fs";
import { promisify } from "util";

const unlinkFile = promisify(fs.unlink);

export const addMovie = async (req, res) => {
  try {
    const file = req.file; // Le fichier est disponible via req.file grâce à Multer

    if (!file) {
      return res.status(400).send("Aucun fichier téléchargé.");
    }

    // Upload du fichier vers Scaleway S3
    const result = await uploadFile(file);

    // Supprime le fichier temporaire de Multer après l'upload vers S3
    await unlinkFile(file.path);

    //TODO: Ajouter la logique pour sauvegarder les infos du film + l'URL S3 dans la BDD MySQL.

    // Confirmation de l'upload S3.
    console.log("Status upload S3:", result);

    res.status(201).json({
      message: "Film uploadé sur S3!",
      s3Location: result.Location, // URL publique du fichier sur S3
      s3Key: result.Key,
    });
  } catch (error) {
    console.error("Erreur de chargement sur S3:", error);
    res.status(500).send("Erreur de chargement sur S3.");
  }
};

export const getMovieImage = async (req, res) => {
  try {
    const key = req.params.key; // Récupère la clé du fichier depuis l'URL
    const readStream = getFileStream(key); // Obtient un flux de lecture depuis S3

    // Pipe le flux du fichier directement vers la réponse HTTP
    // Cela permet d'envoyer l'image au navigateur.
    readStream.pipe(res);
  } catch (error) {
    console.error("Erreur de récupération du fichier depuis S3:", error);
    res.status(500).send("Erreur de récupération du fichier depuis S3.");
  }
};

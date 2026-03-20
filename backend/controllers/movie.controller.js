import { uploadFile } from '../config/s3.js';
import fs from 'fs';
import { promisify } from 'util';

const unlinkFile = promisify(fs.unlink);

export const addMovie = async (req, res) => {
  try {
    const file = req.file; // Le fichier est disponible via req.file grâce à Multer

    if (!file) {
      return res.status(400).send('Aucun fichier téléchargé.');
    }

    // Upload du fichier vers Scaleway S3
    const result = await uploadFile(file);
    
    // Supprime le fichier temporaire de Multer après l'upload vers S3
    await unlinkFile(file.path);

    // Ajouter la logique pour sauvegarder les informations du film
    // (y compris l'URL S3 du fichier) dans la BDD MySQL.


    // Confirmation de l'upload S3.
    console.log('S3 Upload Result:', result);

    res.status(201).json({
      message: 'Film uploadé sur S3!',
      s3Location: result.Location, // URL publique du fichier sur S3
      s3Key: result.Key
    });

  } catch (error) {
    console.error('Erreur de chargement sur S3:', error);
    res.status(500).send('Erreur de chargement sur S3.');
  }
};

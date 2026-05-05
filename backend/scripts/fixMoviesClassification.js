import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marsai',
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true
});

async function fixMoviesClassificationAndAiTools() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    // Fetch all movies 
    const [movies] = await connection.query('SELECT id, classification FROM movies');
    
    let updatedMoviesCount = 0;
    let aiToolsAddedCount = 0;

    for (const movie of movies) {
      const movieId = movie.id;
      const classification = (movie.classification || '').toLowerCase();

      // Fix Classification logic
      let newClassification = 'Hybride';
      if (classification.includes('100') || classification.includes('allai')) {
        newClassification = '100% IA';
      }

      if (movie.classification !== newClassification) {
        await connection.query('UPDATE movies SET classification = ? WHERE id = ?', [newClassification, movieId]);
        updatedMoviesCount++;
      }

      // Check AI tools
      const [aiToolsRes] = await connection.query('SELECT COUNT(*) as count FROM used_ai WHERE movie_id = ?', [movieId]);
      const aiCount = parseInt(aiToolsRes[0].count, 10);

      if (aiCount === 0) {
        // Add a default AI tool since it is mandatory
        await connection.query(
          'INSERT INTO used_ai (movie_id, ai_name, category) VALUES (?, ?, ?)',
          [movieId, 'Non renseigné', 'movie']
        );
        aiToolsAddedCount++;
      }
    }

    await connection.commit();
    console.log(`Migration terminée avec succès.`);
    console.log(`- ${updatedMoviesCount} classifications mises à jour (mises à '100% IA' ou 'Hybride').`);
    console.log(`- ${aiToolsAddedCount} outils IA par défaut créés pour les films sans outils.`);

  } catch (error) {
    await connection.rollback();
    console.error('Erreur lors de la migration:', error);
  } finally {
    connection.release();
    pool.end();
  }
}

fixMoviesClassificationAndAiTools();
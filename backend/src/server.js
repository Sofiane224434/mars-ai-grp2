// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./config/db.js"; 
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import emailRoutes from './routes/email.routes.js';
import juryRoutes from './routes/jury.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion BDD
testConnection(); // Appeler la fonction de test de connexion à la BDD

// Middlewares
// Revenir à la configuration CORS spécifique pour la sécurité en dev
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Logger (dev) - Réintégrer le logger pour le développement
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
        next();
    });
}

//# Routes
// Mettre à jour la route racine pour une réponse JSON plus cohérente pour une API
app.get("/", (req, res) => {
  res.json({ message: 'MarsAI API (ES Modules)', status: 'online' });
});

app.use("/api/auth", authRoutes);
app.use("/api", movieRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/jury', juryRoutes);

// 404 - Ajouter le middleware de gestion des routes non trouvées
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));

app.listen(PORT, () => {
  // Rendre le message de démarrage cohérent avec l'ancienne version
  console.log(`Serveur sur http://localhost:${PORT}`);
});

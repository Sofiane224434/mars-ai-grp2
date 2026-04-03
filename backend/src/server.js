// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { testConnection } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import emailRoutes from './routes/email.routes.js';
import juryRoutes from './routes/jury.routes.js';
import adminRoutes from "./routes/admin.routes.js";
import youtubeRoutes from './routes/youtube.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion BDD
testConnection(); // Appeler la fonction de test de connexion à la BDD

// Middlewares
// CORS dev: autorise localhost/127.0.0.1 sur n'importe quel port (Vite peut changer de port).
// En production, utiliser FRONTEND_URL pour une origine stricte.
const devOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV === 'production') {
      return callback(null, origin === process.env.FRONTEND_URL);
    }

    return callback(null, devOriginPattern.test(origin));
  },
  credentials: true,
}));
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
app.use("/api/admin", adminRoutes);
// Routes OAuth YouTube (start + callback) pour initialiser le refresh token.
app.use('/api/youtube', youtubeRoutes);

// 404 - Ajouter le middleware de gestion des routes non trouvées
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));

app.listen(PORT, () => {
  // Rendre le message de démarrage cohérent avec l'ancienne version
  console.log(`Serveur sur http://localhost:${PORT}`);
});

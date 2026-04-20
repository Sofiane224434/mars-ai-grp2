// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureSchemaUpdates, testConnection } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import emailRoutes from './routes/email.routes.js';
import juryRoutes from './routes/jury.routes.js';
import adminRoutes from "./routes/admin.routes.js";
import youtubeRoutes from './routes/youtube.routes.js';
import newsletterRoutes from "./routes/newsletter.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");
const uploadsPath = path.resolve(__dirname, "../uploads");
const canServeFrontend = process.env.NODE_ENV === "production" && fs.existsSync(frontendIndexPath);

// Connexion BDD
const bootstrapDatabase = async () => {
  await testConnection();
  await ensureSchemaUpdates();
};

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
app.use('/uploads', express.static(uploadsPath));

// Logger (dev) - Réintégrer le logger pour le développement
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
    next();
  });
}

// Tolere un prefixe mal forme (/api}/... ou /api%7D/...) et le corrige.
app.use((req, res, next) => {
  req.url = req.url.replace(/^\/api(?:%7D|})\/?/i, '/api/');
  next();
});

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
app.use('/api/newsletter', newsletterRoutes);

// Servir les assets front en production (si le build existe).
if (canServeFrontend) {
  app.use(express.static(frontendDistPath));
}

// 404 API explicite: on garde une réponse JSON pour les routes backend inconnues.
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route API non trouvée' });
});

// Fallback SPA: renvoie index.html pour les routes web sans extension de fichier.
app.use((req, res) => {
  const hasFileExtension = path.extname(req.path) !== '';

  if (canServeFrontend && !hasFileExtension) {
    return res.sendFile(frontendIndexPath);
  }

  return res.status(404).json({ error: 'Route non trouvée' });
});

bootstrapDatabase()
  .catch((error) => {
    console.error('Echec de l\'initialisation base de donnees:', error);
  })
  .finally(() => {
    app.listen(PORT, () => {
      // Rendre le message de démarrage cohérent avec l'ancienne version
      console.log(`Serveur sur http://localhost:${PORT}`);
    });
  });

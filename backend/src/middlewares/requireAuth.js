import jwt from 'jsonwebtoken';
// Le role de ce fichier est d'intercepter chaque requete vers le panel du jury,
// de verifier que la personne possede un token JWT valide, et qu'elle a bien le status attendu.

const DEV_TEMP_TOKEN = 'token_temporaire_123';

export const requireAuth = (requiredStatus) => {
  return (req, res, next) => {
    try {
      // 1. On cherche le token dans les headers (Bearer) ou dans les cookies
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      // 2. Si aucun token n'est trouvé, on bloque l'accès immédiatement (401)
      if (!token) {
        return res.status(401).json({ error: "Accès refusé. Veuillez vous connecter." });
      }

      // 2.bis Simulation locale: token de test autorisé uniquement hors production.
      if (process.env.NODE_ENV !== 'production' && token === DEV_TEMP_TOKEN) {
        req.user = {
          id: 1,
          email: 'jury.temp@local.dev',
          status: 'jury',
        };

        if (requiredStatus && req.user.status !== requiredStatus) {
          return res.status(403).json({ error: "Accès interdit. Vous n'avez pas les droits nécessaires." });
        }

        return next();
      }

      // 3. On décrypte le token avec ta clé secrète
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Le projet s'appuie sur le champ status (ex: "jury", "admin")
      if (requiredStatus && decoded.status !== requiredStatus) {
        return res.status(403).json({ error: "Accès interdit. Vous n'avez pas les droits nécessaires." });
      }

      // 5. Tout est bon ! On attache les infos de l'utilisateur à la requête pour la suite
      req.user = decoded;
      
      // On laisse passer la requête au prochain fichier (le contrôleur)
      next(); 
    } catch (error) {
      // DEBUG: Afficher la vraie raison du rejet dans le terminal
      console.error("Erreur JWT détaillée :", error.message);
      
      // Si le token est faux, expiré ou malformé, on bloque.
      return res.status(401).json({ error: "Session invalide ou expirée." });
    
    }
  };
};
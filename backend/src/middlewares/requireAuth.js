import jwt from 'jsonwebtoken';

// Le role de ce fichier est d'intercepter chaque requete vers le panel,
// de verifier que la personne possede un token JWT valide, et qu'elle a bien le status attendu.

const DEV_TEMP_TOKEN = 'token_temporaire_123'; // Pour le jury

const getJwtSecret = () => process.env.SESSION_JWT_SECRET || process.env.JWT_SECRET;

const hasRequiredRole = (requiredStatus, currentStatus) => {
  if (!requiredStatus) return true;
  if (Array.isArray(requiredStatus)) return requiredStatus.includes(currentStatus);
  return currentStatus === requiredStatus;
};

export const requireAuth = (requiredStatus) => {
  return (req, res, next) => {
    try {
      // 1. On cherche le token dans les headers (Bearer) ou dans les cookies
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies && (req.cookies.session || req.cookies.jwt)) {
        token = req.cookies.session || req.cookies.jwt;
      }

      // 2. Si aucun token n'est trouvé, on bloque l'accès immédiatement (401)
      if (!token) {
        return res.status(401).json({ error: "Accès refusé. Veuillez vous connecter." });
      }

      // 2.bis Simulation locale: tokens statiques de test autorisés uniquement hors production.
      if (process.env.NODE_ENV !== 'production') {
        
        // Simulation d'un profil Jury
        if (token === DEV_TEMP_TOKEN) {
          req.user = { id: 1, email: 'jury.temp@local.dev', status: 'jury' };
        } 
        // Simulation du profil Admin par défaut
        else if (token === 'tav-admin-local-1') {
          req.user = { id: 2, email: 'admin@marsai.fr', status: 'admin' };
        }
        // Simulation de TON profil Admin
        else if (token === 'tav-admin-flavie-1') {
          req.user = { id: 3, email: 'flavie.michel@laplateforme.io', status: 'admin' };
        }

        // Si l'un des tokens de test a été reconnu, on valide les droits et on passe la suite
        if (req.user) {
          if (!hasRequiredRole(requiredStatus, req.user.status)) {
            return res.status(403).json({ error: "Accès interdit. Vous n'avez pas les droits nécessaires." });
          }
          return next(); // 🚀 On coupe court, pas besoin de décrypter !
        }
      }

      // 3. Si ce n'est pas un token de test, on décrypte le VRAI JWT avec ta clé secrète
      const secret = getJwtSecret();
      if (!secret) {
        return res.status(500).json({ error: 'Configuration JWT manquante.' });
      }
      const decoded = jwt.verify(token, secret);

      const decodedStatus = decoded?.status || decoded?.role;
      const decodedId = decoded?.id ?? (decoded?.sub ? Number(decoded.sub) : null);

      // 4. On vérifie le rôle crypté dans le JWT
      if (!hasRequiredRole(requiredStatus, decodedStatus)) {
        return res.status(403).json({ error: "Accès interdit. Vous n'avez pas les droits nécessaires." });
      }

      // 5. Tout est bon ! On attache les infos de l'utilisateur à la requête pour la suite
      req.user = {
        ...decoded,
        id: Number.isFinite(decodedId) ? decodedId : null,
        status: decodedStatus,
      };
      
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
import jwt from 'jsonwebtoken';
//Le rôle de ce fichier est d'intercepter chaque requête vers le panel du jury, de vérifier que la personne possède un "badge" (le token JWT) valide, et qu'elle a bien le rôle "jury".
export const requireAuth = (requiredRole) => {
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

      // 3. On décrypte le token avec ta clé secrète
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. On vérifie si l'utilisateur a le droit d'être ici (ex: est-il 'jury' ?)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: "Accès interdit. Vous n'avez pas les droits nécessaires." });
      }

      // 5. Tout est bon ! On attache les infos de l'utilisateur à la requête pour la suite
      req.user = decoded;
      
      // On laisse passer la requête au prochain fichier (le contrôleur)
      next(); 
    } catch (error) {
      // Si le token est faux, expiré ou malformé, on bloque.
      return res.status(401).json({ error: "Session invalide ou expirée." });
    }
  };
};
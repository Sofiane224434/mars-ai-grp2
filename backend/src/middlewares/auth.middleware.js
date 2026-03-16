// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // .js ! ⬅️
const authMiddleware = async (req, res, next) => {
try {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ error: 'Token manquant' });
}
const token = authHeader.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id);
if (!user) {
return res.status(401).json({ error: 'Utilisateur non trouvé' });
}
req.user = user;
next();
} catch (error) {
if (error.name === 'TokenExpiredError') {
return res.status(401).json({ error: 'Token expiré' });
}
return res.status(401).json({ error: 'Token invalide' });
}
};
export default authMiddleware;
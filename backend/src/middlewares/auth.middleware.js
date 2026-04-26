import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getSessionSecret = () =>
	process.env.SESSION_JWT_SECRET || process.env.JWT_SECRET;

const extractBearerToken = (req) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
	return authHeader.split(" ")[1] || null;
};

const extractCookieToken = (req) => {
	const rawCookie = req.headers.cookie;
	if (!rawCookie) return null;

	const cookies = rawCookie.split(";").reduce((acc, item) => {
		const [rawKey, ...rawVal] = item.trim().split("=");
		if (!rawKey) return acc;
		acc[rawKey] = decodeURIComponent(rawVal.join("="));
		return acc;
	}, {});

	return cookies.session || null;
};

const extractToken = (req) => extractCookieToken(req) || extractBearerToken(req);

export const requireAuth = (allowedRoles = []) => {
	return async (req, res, next) => {
		try {
			const secret = getSessionSecret();
			if (!secret) {
				return res.status(500).json({ error: "Configuration JWT manquante" });
			}

			const token = extractToken(req);
			if (!token) {
				return res.status(401).json({ error: "Token manquant" });
			}

			const decoded = jwt.verify(token, secret);

			if (!decoded || decoded.type !== "session") {
				return res.status(401).json({ error: "Token de session invalide" });
			}

			const user = await User.findById(Number(decoded.sub));
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé" });
			}

			if (!decoded.tav || decoded.tav !== user.token_access) {
				return res.status(401).json({ error: "Session révoquée" });
			}

			if (allowedRoles.length > 0 && !allowedRoles.includes(user.status)) {
				return res.status(403).json({ error: "Accès interdit" });
			}

			req.user = user;
			return next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ error: "Token expiré" });
			}
			return res.status(401).json({ error: "Token invalide" });
		}
	};
};

export default requireAuth(["admin", "jury"]);
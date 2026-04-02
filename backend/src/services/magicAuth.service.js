import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendCustomEmail } from "./email.service.js";

/* -------------------------
   Erreurs typées
-------------------------- */
export class AuthConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthConfigError";
  }
}

export class MagicTokenInvalidError extends Error {
  constructor(message = "Token magique invalide.") {
    super(message);
    this.name = "MagicTokenInvalidError";
  }
}

export class MagicTokenExpiredError extends Error {
  constructor(message = "Token magique expiré.") {
    super(message);
    this.name = "MagicTokenExpiredError";
  }
}

export class UserNotFoundError extends Error {
  constructor(message = "Utilisateur introuvable.") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class AccessTokenVersionMismatchError extends Error {
  constructor(message = "Le lien de connexion n'est plus valide.") {
    super(message);
    this.name = "AccessTokenVersionMismatchError";
  }
}

/* -------------------------
   Helpers config
-------------------------- */
const MAGIC_LINK_EXPIRES_IN = process.env.MAGIC_LINK_EXPIRES_IN || "15m";
const SESSION_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const getMagicSecret = () =>
  process.env.MAGIC_LINK_JWT_SECRET || process.env.JWT_SECRET;

const getSessionSecret = () =>
  process.env.SESSION_JWT_SECRET || process.env.JWT_SECRET;

const assertSecrets = () => {
  if (!getMagicSecret()) {
    throw new AuthConfigError(
      "Secret JWT manquant (MAGIC_LINK_JWT_SECRET ou JWT_SECRET).",
    );
  }
  if (!getSessionSecret()) {
    throw new AuthConfigError(
      "Secret session manquant (SESSION_JWT_SECRET ou JWT_SECRET).",
    );
  }
};

/* -------------------------
   Génération token magique
-------------------------- */
export const generateMagicLinkToken = (user) => {
  assertSecrets();

  const payload = {
    sub: String(user.id),
    email: user.email,
    role: user.status, // admin | jury
    type: "magic_link",
    tav: user.token_access, // token access version (révocation légère)
  };

  return jwt.sign(payload, getMagicSecret(), {
    expiresIn: MAGIC_LINK_EXPIRES_IN,
  });
};

/* -------------------------
   Vérification token magique
-------------------------- */
export const verifyMagicToken = (token) => {
  assertSecrets();

  try {
    const decoded = jwt.verify(token, getMagicSecret());

    if (!decoded || decoded.type !== "magic_link") {
      throw new MagicTokenInvalidError("Type de token invalide.");
    }

    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new MagicTokenExpiredError();
    }
    if (error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
      throw new MagicTokenInvalidError();
    }
    throw error;
  }
};

/* -------------------------
   Envoi du magic link
-------------------------- */
export const issueMagicLinkForEmail = async ({
  email,
  appBaseUrl = process.env.APP_URL || "http://localhost:5173",
}) => {
  const user = await User.findByEmail(email);

  // Anti-énumération: le contrôleur renverra 200 dans tous les cas
  if (!user) return { sent: false };

  const magicToken = generateMagicLinkToken(user);
  const loginUrl = `${appBaseUrl}/auth?token=${encodeURIComponent(magicToken)}`;

  await sendCustomEmail({
    to: user.email,
    name: user.email,
    subject: "Votre lien de connexion MarsAI",
    message:
      `Bonjour,\n\n` +
      `Voici votre lien de connexion (valable ${MAGIC_LINK_EXPIRES_IN}) :\n` +
      `${loginUrl}\n\n` +
      `Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.`,
  });

  return { sent: true };
};

/* -------------------------
   Échange magic token -> session token
-------------------------- */
export const exchangeMagicTokenForSession = async ({ token }) => {
  const decoded = verifyMagicToken(token);

  const user = await User.findById(Number(decoded.sub));
  if (!user) throw new UserNotFoundError();

  // Vérification "révocation légère"
  if (decoded.tav !== user.token_access) {
    throw new AccessTokenVersionMismatchError();
  }

  const sessionToken = generateSessionToken(user);

  return { user, sessionToken };
};

/* -------------------------
   Génération session JWT
-------------------------- */
export const generateSessionToken = (user) => {
  assertSecrets();

  const payload = {
    sub: String(user.id),
    email: user.email,
    role: user.status,
    type: "session",
    tav: user.token_access,
  };

  return jwt.sign(payload, getSessionSecret(), {
    expiresIn: SESSION_EXPIRES_IN,
  });
};

export const rotateUserAccessTokenVersion = async (userId) => {
  const newTokenAccess = `tav-reset-${crypto.randomUUID()}`;
  const updated = await User.updateAccessTokenById(userId, newTokenAccess);
  if (!updated) throw new UserNotFoundError();
  return newTokenAccess;
};

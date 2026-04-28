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
const MAGIC_LINK_EXPIRES_IN = process.env.MAGIC_LINK_EXPIRES_IN || "1d";
const SESSION_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const getMagicSecret = () =>
  process.env.MAGIC_LINK_JWT_SECRET || process.env.JWT_SECRET;

const getSessionSecret = () =>
  process.env.SESSION_JWT_SECRET || process.env.JWT_SECRET;

const getAdminEnvToken = () => process.env.ADMIN_ENV_TOKEN || "";

const getAdminEmail = () => process.env.ADMIN_EMAIL || "";

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
  const adminEnvToken = getAdminEnvToken();

  if (
    process.env.NODE_ENV !== "production" &&
    adminEnvToken &&
    token === adminEnvToken
  ) {
    const adminEmail = getAdminEmail();
    if (!adminEmail) {
      throw new AuthConfigError(
        "ADMIN_EMAIL manquant pour la connexion admin via .env.",
      );
    }

    const adminUser = await User.findByEmail(adminEmail);
    if (!adminUser) {
      throw new UserNotFoundError(
        "Compte admin introuvable pour la connexion via .env.",
      );
    }

    if (adminUser.status !== "admin") {
      throw new AuthConfigError(
        "ADMIN_EMAIL doit pointer vers un utilisateur admin.",
      );
    }

    const sessionToken = generateSessionToken(adminUser);
    return { user: adminUser, sessionToken };
  }

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

const defaultInvitationSubject =
  "MarsAI - Invitation à rejoindre le jury officiel";

const defaultInvitationBody = ({ customMessage = "" }) =>
  `Nous avons l'immense honneur de vous inviter à faire partie du jury officiel de cette nouvelle édition du festival MarsAI !\n` +
  `Votre expertise sera précieuse pour l'évaluation des courts métrages en compétition.\n\n` +
  (customMessage ? `${customMessage}\n\n` : "") +
  `Période de visionnage :\n` +
  `Les œuvres qui vous seront assignées durent au maximum 2 minutes.\n\n` +
  `Note de l'équipe : L'accès à ce panel de sélection est strictement confidentiel. Merci de ne pas partager votre token ni les contenus visionnés. Si vous pensez avoir reçu cet e-mail par erreur, ignorez-le.\n\n` +
  `Nous vous remercions chaleureusement pour le temps et l'attention que vous accorderez au travail des réalisateurs.\n\n` +
  `Créativement,\n` +
  `L'équipe MarsAI`;

const buildAccessBlock = ({ loginUrl, invitationToken, expiryDate }) =>
  `\n\n— Vos accès personnels (générés automatiquement) —\n` +
  `Lien de connexion sécurisé : ${loginUrl}\n` +
  `Token d'accès personnel : ${invitationToken}\n` +
  `Valide jusqu'au : ${expiryDate}`;

const stripLeadingGreeting = (body) => {
  if (!body) return "";
  return body.replace(/^\s*Bonjour[^\n,]*,?\s*\n+/i, "");
};

export const issueInvitationForEmail = async ({
  email,
  customMessage = "",
  customSubject = "",
  customBody = "",
  appBaseUrl = process.env.APP_URL || "http://localhost:5173",
}) => {
  assertSecrets();

  // Crée le compte jury s'il n'existe pas, ou récupère le compte existant
  const { user, created } = await User.createJuryMember(email);

  // Token d'invitation valable 7 jours (plus long qu'un magic link classique)
  const invitationToken = jwt.sign(
    {
      sub: String(user.id),
      email: user.email,
      role: user.status,
      type: "magic_link",
      tav: user.token_access,
    },
    getMagicSecret(),
    { expiresIn: "7d" },
  );

  const decoded = jwt.decode(invitationToken);
  const expiryDate = new Date(decoded.exp * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const loginUrl = `${appBaseUrl}/auth?token=${encodeURIComponent(invitationToken)}`;
  const displayName = user.email.split("@")[0];

  const subject = customSubject || defaultInvitationSubject;
  const rawBody = customBody || defaultInvitationBody({ customMessage });
  const greeting = `Bonjour ${displayName},\n\n`;
  const message =
    greeting +
    stripLeadingGreeting(rawBody) +
    buildAccessBlock({ loginUrl, invitationToken, expiryDate });

  await sendCustomEmail({
    to: user.email,
    name: user.email,
    subject,
    message,
  });

  return { email: user.email, created };
};
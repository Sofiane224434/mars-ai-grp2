import {
  AccessTokenVersionMismatchError,
  AuthConfigError,
  MagicTokenExpiredError,
  MagicTokenInvalidError,
  UserNotFoundError,
  exchangeMagicTokenForSession,
  issueMagicLinkForEmail,
  rotateUserAccessTokenVersion,
} from "../services/magicAuth.service.js";
import { loginSchema, requestTokenSchema } from "../schemas/auth.schema.js";

const SESSION_COOKIE_NAME = "session";

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const requestToken = async (req, res) => {
  try {
    const parsed = requestTokenSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({
        error: "Payload invalide",
        details: parsed.error.flatten(),
      });
    }

    const { email } = parsed.data.body;
    await issueMagicLinkForEmail({ email });

    // Anti-énumération: toujours 200 avec message neutre
    return res.status(200).json({
      message:
        "Si un compte correspond à cet email, un lien de connexion lui a été envoyé.",
    });
  } catch (error) {
    if (error instanceof AuthConfigError) {
      return res.status(500).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la demande de lien." });
  }
};

export const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({
        error: "Payload invalide",
        details: parsed.error.flatten(),
      });
    }

    const { token } = parsed.data.body;

    const { user, sessionToken } = await exchangeMagicTokenForSession({
      token,
    });

    res.cookie(SESSION_COOKIE_NAME, sessionToken, SESSION_COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        status: user.status,
      },
      token: sessionToken,
    });
  } catch (error) {
    if (
      error instanceof MagicTokenInvalidError ||
      error instanceof MagicTokenExpiredError ||
      error instanceof AccessTokenVersionMismatchError ||
      error instanceof UserNotFoundError
    ) {
      return res.status(401).json({ error: error.message });
    }

    if (error instanceof AuthConfigError) {
      return res.status(500).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la connexion." });
  }
};

export const getProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

export const logout = async (req, res) => {
  try {
    let reissuedMagicLink = false;

    if (req.user?.id) {
      await rotateUserAccessTokenVersion(req.user.id);

      if (req.user.status === "jury" && req.user.email) {
        try {
          const { sent } = await issueMagicLinkForEmail({ email: req.user.email });
          reissuedMagicLink = Boolean(sent);
        } catch (emailError) {
          console.error(
            "Erreur lors de l'envoi automatique du nouveau token jury à la déconnexion :",
            emailError,
          );
        }
      }
    }

    res.clearCookie(SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS);
    return res.status(200).json({
      message: reissuedMagicLink
        ? "Déconnexion réussie. Un nouveau lien de connexion a été envoyé par e-mail."
        : "Déconnexion réussie",
      reissuedMagicLink,
    });
  } catch (error) {
    if (error instanceof AuthConfigError) {
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la déconnexion." });
  }
};

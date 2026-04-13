import { z } from "zod";
import {
  BrevoSyncError,
  NewsletterConfigError,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  verifyNewsletterUnsubscribeToken,
} from "../services/newsletter.service.js";
import {
  newsletterSubscribeSchema,
  newsletterUnsubscribeSchema,
  newsletterUnsubscribeTokenSchema,
} from "../schemas/newsletter.schema.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    // Endpoint public: inscription newsletter depuis le footer.
    const parsed = newsletterSubscribeSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({
        error: "Payload invalide",
        details: z.treeifyError(parsed.error),
      });
    }

    const { email } = parsed.data.body;
    const result = await subscribeToNewsletter({ email });

    return res.status(200).json({
      message: "Inscription newsletter confirmee.",
      ...result,
    });
  } catch (error) {
    if (error instanceof NewsletterConfigError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof BrevoSyncError) {
      return res.status(error.statusCode || 502).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Erreur serveur lors de l'inscription newsletter." });
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    // Endpoint applicatif: désinscription explicite via email.
    const parsed = newsletterUnsubscribeSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({
        error: "Payload invalide",
        details: z.treeifyError(parsed.error),
      });
    }

    const { email } = parsed.data.body;
    const result = await unsubscribeFromNewsletter({ email });

    return res.status(200).json({
      message: "Desinscription newsletter confirmee.",
      ...result,
    });
  } catch (error) {
    if (error instanceof NewsletterConfigError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof BrevoSyncError) {
      return res.status(error.statusCode || 502).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la desinscription newsletter." });
  }
};

export const unsubscribeNewsletterFromToken = async (req, res) => {
  try {
    // Endpoint lien de désinscription émis par l'application (token signé).
    const parsed = newsletterUnsubscribeTokenSchema.safeParse({ query: req.query });
    if (!parsed.success) {
      return res.status(400).json({
        error: "Token de desinscription invalide",
        details: z.treeifyError(parsed.error),
      });
    }

    const email = verifyNewsletterUnsubscribeToken(parsed.data.query.token);
    const result = await unsubscribeFromNewsletter({ email });

    return res.status(200).json({
      message: "Desinscription newsletter confirmee.",
      ...result,
    });
  } catch (error) {
    if (error instanceof NewsletterConfigError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof BrevoSyncError) {
      return res.status(error.statusCode || 401).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la desinscription newsletter." });
  }
};

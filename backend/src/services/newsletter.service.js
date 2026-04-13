import jwt from "jsonwebtoken";
import Newsletter from "../models/newsletter.model.js";

class NewsletterConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewsletterConfigError";
  }
}

class BrevoSyncError extends Error {
  constructor(message, statusCode = 502) {
    super(message);
    this.name = "BrevoSyncError";
    this.statusCode = statusCode;
  }
}

const BREVO_BASE_URL = "https://api.brevo.com/v3";
const NEWSLETTER_ACTIVE_STATUS = "subscribed";
const NEWSLETTER_INACTIVE_STATUS = "unsubscribed";

const normalizeEmail = (email) => email.trim().toLowerCase();

const getBrevoApiKey = () => process.env.BREVO_API_KEY || "";

const getNewsletterPublicListId = () => {
  // Tolère plusieurs noms de variable pour simplifier la config en équipe.
  const raw =
    process.env.BREVO_PUBLIC_NEWSLETTER_LIST_ID ||
    process.env.BREVO_PUBLIC_LIST_ID ||
    process.env.BREVO_NEWSLETTER_LIST_ID;
  const parsed = Number(raw);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new NewsletterConfigError(
      "BREVO_PUBLIC_NEWSLETTER_LIST_ID manquant ou invalide.",
    );
  }

  return parsed;
};

const assertBrevoNewsletterConfig = () => {
  if (!getBrevoApiKey()) {
    throw new NewsletterConfigError("BREVO_API_KEY manquant.");
  }

  getNewsletterPublicListId();
};

const getUnsubscribeSecret = () =>
  process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || process.env.JWT_SECRET || "";

const assertUnsubscribeSecret = () => {
  if (!getUnsubscribeSecret()) {
    throw new NewsletterConfigError(
      "Secret de desinscription manquant (NEWSLETTER_UNSUBSCRIBE_SECRET ou JWT_SECRET).",
    );
  }
};

const brevoRequest = async (endpoint, { method = "GET", body } = {}) => {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    throw new NewsletterConfigError("BREVO_API_KEY manquant.");
  }

  // Wrapper centralisé: même gestion des headers et des erreurs pour tous les appels Brevo.
  const response = await fetch(`${BREVO_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    if (response.status === 204) return null;
    return response.json();
  }

  let message = "Erreur de synchronisation Brevo";
  try {
    const data = await response.json();
    message = data?.message || message;
  } catch {
    const text = await response.text();
    if (text) message = text;
  }

  throw new BrevoSyncError(message, response.status);
};

const syncBrevoSubscribe = async (email) => {
  const listId = getNewsletterPublicListId();

  await brevoRequest("/contacts", {
    method: "POST",
    body: {
      email,
      updateEnabled: true,
    },
  });

  await brevoRequest(`/contacts/lists/${listId}/contacts/add`, {
    method: "POST",
    body: {
      emails: [email],
    },
  });
};

const syncBrevoUnsubscribe = async (email) => {
  const listId = getNewsletterPublicListId();

  await brevoRequest(`/contacts/lists/${listId}/contacts/remove`, {
    method: "POST",
    body: {
      emails: [email],
    },
  });
};

const getBrevoContactByEmail = async (email) => {
  try {
    return await brevoRequest(`/contacts/${encodeURIComponent(email)}`);
  } catch (error) {
    // Un contact absent dans Brevo est traité comme désinscrit côté synchronisation locale.
    if (error instanceof BrevoSyncError && error.statusCode === 404) {
      return null;
    }

    throw error;
  }
};

const isUnsubscribedInBrevo = (contact, listId) => {
  if (!contact) return true;

  const listIds = Array.isArray(contact.listIds) ? contact.listIds : [];
  return Boolean(contact.emailBlacklisted) || !listIds.includes(listId);
};

export const subscribeToNewsletter = async ({ email }) => {
  assertBrevoNewsletterConfig();
  const normalizedEmail = normalizeEmail(email);

  const previous = await Newsletter.findByEmail(normalizedEmail);
  const record = await Newsletter.upsertStatus(
    normalizedEmail,
    NEWSLETTER_ACTIVE_STATUS,
  );

  try {
    await syncBrevoSubscribe(normalizedEmail);
  } catch (error) {
    if (error instanceof BrevoSyncError) {
      throw new BrevoSyncError(
        `Inscription locale enregistree mais synchro Brevo echouee: ${error.message}`,
        error.statusCode,
      );
    }
    throw error;
  }

  const status = !previous
    ? "created"
    : previous.status === NEWSLETTER_ACTIVE_STATUS
      ? "already_subscribed"
      : "reactivated";

  return {
    email: record.email,
    status,
  };
};

export const unsubscribeFromNewsletter = async ({ email }) => {
  assertBrevoNewsletterConfig();
  const normalizedEmail = normalizeEmail(email);
  const record = await Newsletter.upsertStatus(
    normalizedEmail,
    NEWSLETTER_INACTIVE_STATUS,
  );

  try {
    await syncBrevoUnsubscribe(normalizedEmail);
  } catch (error) {
    if (error instanceof BrevoSyncError) {
      throw new BrevoSyncError(
        `Desinscription locale enregistree mais synchro Brevo echouee: ${error.message}`,
        error.statusCode,
      );
    }
    throw error;
  }

  return {
    email: record.email,
    status: "unsubscribed",
  };
};

export const generateNewsletterUnsubscribeToken = (email) => {
  assertUnsubscribeSecret();

  return jwt.sign(
    {
      type: "newsletter_unsubscribe",
      email: normalizeEmail(email),
    },
    getUnsubscribeSecret(),
    { expiresIn: "30d" },
  );
};

export const verifyNewsletterUnsubscribeToken = (token) => {
  assertUnsubscribeSecret();

  const decoded = jwt.verify(token, getUnsubscribeSecret());
  if (decoded?.type !== "newsletter_unsubscribe" || !decoded?.email) {
    throw new BrevoSyncError("Token de desinscription invalide.", 401);
  }

  return normalizeEmail(decoded.email);
};

export const syncBrevoUnsubscribedToDatabase = async () => {
  assertBrevoNewsletterConfig();

  const listId = getNewsletterPublicListId();
  // On ne vérifie que les contacts actuellement actifs en base locale.
  const localSubscribedContacts = await Newsletter.findAllByStatus(
    NEWSLETTER_ACTIVE_STATUS,
  );

  const unsubscribedEmails = [];

  for (const contact of localSubscribedContacts) {
    // Source de vérité unsubscribe: état du contact côté Brevo (listes + blacklist email).
    const brevoContact = await getBrevoContactByEmail(contact.email);
    if (!isUnsubscribedInBrevo(brevoContact, listId)) {
      continue;
    }

    await Newsletter.upsertStatus(contact.email, NEWSLETTER_INACTIVE_STATUS);
    unsubscribedEmails.push(contact.email);
  }

  return {
    checked: localSubscribedContacts.length,
    updated: unsubscribedEmails.length,
    unsubscribedEmails,
  };
};

export { NewsletterConfigError, BrevoSyncError };

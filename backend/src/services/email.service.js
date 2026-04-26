import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { BrevoClient } = require("@getbrevo/brevo");

const getBrevoClient = () => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Configuration Brevo incomplète: BREVO_API_KEY manquant");
  }
  return new BrevoClient({ apiKey });
};

const getDefaultSender = () => ({
  name: process.env.BREVO_SENDER_NAME || "MarsAI",
  email: process.env.BREVO_SENDER_EMAIL,
});

/**
 * Envoi d'e-mail via Brevo
 */
export const sendCustomEmail = async ({ to, subject, message, name }) => {
  if (!process.env.BREVO_SENDER_EMAIL) {
    throw new Error("Configuration Brevo incomplète: BREVO_SENDER_EMAIL manquant");
  }

  const client = getBrevoClient();
  const sender = getDefaultSender();

  try {
    const response = await client.transactionalEmails.sendTransacEmail({
      to: [{ email: to, name: name || to }],
      sender,
      subject,
      textContent: message,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h1 style="font-size: 20px; margin-bottom: 16px;">${subject}</h1>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    console.log(`[SUCCÈS] E-mail transactionnel envoyé à ${to}`);
    return response;
  } catch (error) {
    console.error(`[ERREUR BREVO] Échec de l'envoi à ${to}:`, error);
    throw error;
  }
};
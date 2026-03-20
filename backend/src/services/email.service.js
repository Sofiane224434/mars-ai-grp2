import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { BrevoClient } = require('@getbrevo/brevo');

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

const DEFAULT_SENDER = {
    name: process.env.BREVO_SENDER_NAME || 'MarsAI',
    email: process.env.BREVO_SENDER_EMAIL,
};

export const sendCustomEmail = async ({ to, subject, message, name }) => {
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
        throw new Error('Configuration Brevo incomplète');
    }

    return client.transactionalEmails.sendTransacEmail({
        to: [{ email: to, name: name || to }],
        sender: DEFAULT_SENDER,
        subject,
        textContent: message,
        htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
                <h1 style="font-size: 20px; margin-bottom: 16px;">${subject}</h1>
                <p>${message.replace(/\n/g, '<br />')}</p>
            </div>
        `,
    });
};
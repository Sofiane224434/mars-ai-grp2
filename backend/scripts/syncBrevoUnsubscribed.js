import dotenv from "dotenv";
import pool from "../src/config/db.js";
import { syncBrevoUnsubscribedToDatabase } from "../src/services/newsletter.service.js";

dotenv.config();

// Script CLI: synchronise les désinscriptions Brevo vers la table newsletter locale.
// Usage: npm run sync:newsletter-unsubscribed
const run = async () => {
  try {
    const result = await syncBrevoUnsubscribedToDatabase();

    console.log("Synchronisation Brevo -> newsletter terminee");
    console.log(`- Contacts verifies: ${result.checked}`);
    console.log(`- Contacts passes a unsubscribed: ${result.updated}`);

    if (result.unsubscribedEmails.length > 0) {
      console.log("- Emails mis a jour:");
      for (const email of result.unsubscribedEmails) {
        console.log(`  - ${email}`);
      }
    }
  } catch (error) {
    const readableMessage =
      error?.message ||
      error?.sqlMessage ||
      error?.code ||
      "Erreur inconnue";

    console.error("Echec de la synchronisation newsletter:", readableMessage);

    if (error?.statusCode) {
      console.error("Status fournisseur:", error.statusCode);
    }

    if (error?.code) {
      console.error("Code technique:", error.code);
    }

    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();

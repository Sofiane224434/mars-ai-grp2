import { query } from "../config/db.js";

const TABLE_NAME = "newsletter";

const Newsletter = {
  // Retourne un contact newsletter unique par email.
  async findByEmail(email) {
    const sql = `SELECT id, email, status FROM ${TABLE_NAME} WHERE email = ? LIMIT 1`;
    const results = await query(sql, [email]);
    return results[0] || null;
  },

  // Utilise le status local comme source de vérité métier (subscribed/unsubscribed).
  async findAllByStatus(status) {
    const sql = `SELECT id, email, status FROM ${TABLE_NAME} WHERE status = ? ORDER BY id ASC`;
    return query(sql, [status]);
  },

  // Idempotent: crée le contact s'il n'existe pas, sinon met à jour son status.
  async upsertStatus(email, status) {
    const sql = `
      INSERT INTO ${TABLE_NAME} (email, status)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;

    await query(sql, [email, status]);
    return this.findByEmail(email);
  },
};

export default Newsletter;

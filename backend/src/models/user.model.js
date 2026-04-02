import { query } from "../config/db.js";

const USER_SELECT_FIELDS = "id, email, status, token_access";

const User = {
  async findByEmail(email) {
    const sql = `SELECT ${USER_SELECT_FIELDS} FROM users WHERE email = ? LIMIT 1`;
    const results = await query(sql, [email.toLowerCase()]);
    return results[0] || null;
  },

  async findById(id) {
    const sql = `SELECT ${USER_SELECT_FIELDS} FROM users WHERE id = ? LIMIT 1`;
    const results = await query(sql, [id]);
    return results[0] || null;
  },

  async findByAccessToken(tokenAccess) {
    const sql = `SELECT ${USER_SELECT_FIELDS} FROM users WHERE token_access = ? LIMIT 1`;
    const results = await query(sql, [tokenAccess]);
    return results[0] || null;
  },
};

export default User;

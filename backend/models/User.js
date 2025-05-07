const pool = require('./db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function createUser(name, email, password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user into the database
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword]
    );

    return result.rows[0]; // return the newly created user
  } catch (err) {
    throw err;
  }
}

async function findUserByEmail(email) {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    return result.rows[0]; // null if not found
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  findUserByEmail
};

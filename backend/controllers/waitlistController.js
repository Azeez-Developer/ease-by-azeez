const pool = require('../models/db');

// 📝 Add user to waitlist
exports.addToWaitlist = async (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.userId;

  try {
    // Check if user already exists in waitlist
    const exists = await pool.query(
      `SELECT * FROM waitlists WHERE book_id = $1 AND user_id = $2`,
      [book_id, user_id]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'You are already on the waitlist for this book.' });
    }

    // Insert new waitlist entry
    const result = await pool.query(
      `INSERT INTO waitlists (book_id, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [book_id, user_id]
    );

    res.status(201).json({ message: 'Added to waitlist', waitlist: result.rows[0] });
  } catch (err) {
    console.error('Error adding to waitlist:', err);
    res.status(500).json({ message: 'Failed to join waitlist' });
  }
};

// 🔐 Get waitlist for a specific book (admin only)
exports.getWaitlistByBook = async (req, res) => {
  const user = req.user;
  const { book_id } = req.params;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const result = await pool.query(
      `SELECT wl.id, u.name, u.email, wl.joined_at
       FROM waitlists wl
       JOIN users u ON wl.user_id = u.id
       WHERE wl.book_id = $1
       ORDER BY wl.joined_at ASC`,
      [book_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching waitlist:', err);
    res.status(500).json({ message: 'Failed to fetch waitlist' });
  }
};

// ❌ Remove user from waitlist
exports.removeFromWaitlist = async (req, res) => {
  const user_id = req.user.userId;
  const { book_id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM waitlists
       WHERE book_id = $1 AND user_id = $2
       RETURNING *`,
      [book_id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'You are not on the waitlist for this book.' });
    }

    res.json({ message: 'Removed from waitlist', removed: result.rows[0] });
  } catch (err) {
    console.error('Error removing from waitlist:', err);
    res.status(500).json({ message: 'Failed to remove from waitlist' });
  }
};

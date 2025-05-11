const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// 📚 POST: Submit a new book donation
router.post('/', async (req, res) => {
  const { title, author, genre, donor_name, donor_email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO donations (title, author, genre, donor_name, donor_email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, author, genre, donor_name, donor_email]
    );

    res.status(201).json({ message: 'Donation submitted', donation: result.rows[0] });
  } catch (err) {
    console.error('Error submitting donation:', err);
    res.status(500).json({ message: 'Failed to submit donation' });
  }
});

const authenticateToken = require('../middlewares/authMiddleware');

// 🔐 GET: View all donations (admin only)
router.get('/', authenticateToken, async (req, res) => {
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  const { status } = req.query;

  try {
    let result;

    if (status) {
      result = await pool.query(
        `SELECT * FROM donations WHERE status = $1 ORDER BY created_at DESC`,
        [status.toLowerCase()]
      );
    } else {
      result = await pool.query(
        `SELECT * FROM donations ORDER BY created_at DESC`
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// 🔄 PUT: Update donation status (approve or reject)
router.put('/:id', authenticateToken, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { status } = req.body;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  if (!['approved', 'rejected'].includes(status?.toLowerCase())) {
    return res.status(400).json({ message: 'Status must be either approved or rejected.' });
  }

  try {
    const result = await pool.query(
      `UPDATE donations SET status = $1 WHERE id = $2 RETURNING *`,
      [status.toLowerCase(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: `Donation ${status} successfully`, donation: result.rows[0] });
  } catch (err) {
    console.error('Error updating donation status:', err);
    res.status(500).json({ message: 'Failed to update donation' });
  }
});


module.exports = router;

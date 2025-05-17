const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const authenticateToken = require('../middlewares/authMiddleware');

// 📚 Borrow a book
router.post('/', authenticateToken, async (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.userId;
  const due_date = new Date();
  due_date.setDate(due_date.getDate() + 30);

  try {
    const bookCheck = await pool.query(
      'SELECT * FROM books WHERE id = $1 AND status = $2',
      [book_id, 'available']
    );

    if (bookCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Book is not available or does not exist' });
    }

    const borrow = await pool.query(
      `INSERT INTO borrows (user_id, book_id, due_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, book_id, due_date]
    );

    await pool.query(
      `UPDATE books SET status = 'borrowed' WHERE id = $1`,
      [book_id]
    );

    res.status(201).json(borrow.rows[0]);
  } catch (err) {
    console.error('Error borrowing book:', err);
    res.status(500).json({ message: 'Failed to borrow book' });
  }
});

// 🔁 Return a book
router.put('/return/:book_id', authenticateToken, async (req, res) => {
  const user_id = req.user.userId;
  const book_id = req.params.book_id;

  try {
    const result = await pool.query(
      `UPDATE borrows
       SET returned_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 AND book_id = $2 AND returned_at IS NULL
       RETURNING *`,
      [user_id, book_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No active borrow record found for this book' });
    }

    await pool.query(
      `UPDATE books SET status = 'available' WHERE id = $1`,
      [book_id]
    );

    // 🔄 Emit real-time event using Socket.IO
    const io = req.app.get('io');
    io.emit('bookReturned', {
      book_id,
      message: 'A book has been returned and is now available!'
    });

    res.json({ message: 'Book returned successfully', borrow: result.rows[0] });
  } catch (err) {
    console.error('Error returning book:', err);
    res.status(500).json({ message: 'Failed to return book' });
  }
});

// 📋 Get all books borrowed by the logged-in user
router.get('/my-borrows', authenticateToken, async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT br.id AS borrow_id, bk.title, bk.author, br.due_date, br.borrowed_at, br.returned_at
       FROM borrows br
       JOIN books bk ON br.book_id = bk.id
       WHERE br.user_id = $1
       ORDER BY br.borrowed_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching borrowed books:', err);
    res.status(500).json({ message: 'Failed to fetch borrowed books' });
  }
});

// 📌 Get currently borrowed books (not yet returned)
router.get('/current', authenticateToken, async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT br.id AS borrow_id, bk.title, bk.author, br.due_date, br.borrowed_at
       FROM borrows br
       JOIN books bk ON br.book_id = bk.id
       WHERE br.user_id = $1 AND br.returned_at IS NULL
       ORDER BY br.borrowed_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching currently borrowed books:', err);
    res.status(500).json({ message: 'Failed to fetch active borrows' });
  }
});

// ✏️ Update due date (admin or user)
router.put('/update-due/:book_id', authenticateToken, async (req, res) => {
  const { due_date } = req.body;
  const user_id = req.user.userId;
  const book_id = req.params.book_id;

  try {
    const result = await pool.query(
      `UPDATE borrows
       SET due_date = $1
       WHERE user_id = $2 AND book_id = $3 AND returned_at IS NULL
       RETURNING *`,
      [due_date, user_id, book_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Active borrow not found' });
    }

    res.json({ message: 'Due date updated', borrow: result.rows[0] });
  } catch (err) {
    console.error('Error updating due date:', err);
    res.status(500).json({ message: 'Failed to update due date' });
  }
});

module.exports = router;

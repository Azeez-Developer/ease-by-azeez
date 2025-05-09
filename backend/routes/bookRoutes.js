const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const authenticateToken = require('../middlewares/authMiddleware');

// 📚 Get all books (public route)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

// ➕ Add a new book (admin only)
router.post('/', authenticateToken, async (req, res) => {
  const { title, author, genre } = req.body;

  // Check admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can add books' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, genre)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, author, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// Update a book (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
    const { title, author, genre, status } = req.body;
    const bookId = req.params.id;
  
    // Check admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update books' });
    }
  
    try {
      const result = await pool.query(
        `UPDATE books
         SET title = $1, author = $2, genre = $3, status = $4
         WHERE id = $5
         RETURNING *`,
        [title, author, genre, status, bookId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating book:', err);
      res.status(500).json({ message: 'Failed to update book' });
    }
  });

  // Delete a book (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
    const bookId = req.params.id;
  
    // Check admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete books' });
    }
  
    try {
      const result = await pool.query(
        `DELETE FROM books WHERE id = $1 RETURNING *`,
        [bookId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ message: 'Failed to delete book' });
    }
  });
  
  // 📘 Get status of a specific book
router.get('/:id/status', async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT id, title, status FROM books WHERE id = $1',
      [bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching book status:', err);
    res.status(500).json({ message: 'Failed to fetch book status' });
  }
});


module.exports = router;

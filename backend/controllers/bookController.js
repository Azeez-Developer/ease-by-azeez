const pool = require('../models/db');

// 📚 Get all books (public)
exports.getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// ➕ Add new book (admin only)
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;

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
};

// ✏️ Update book (admin only)
exports.updateBook = async (req, res) => {
  const { title, author, genre, status } = req.body;
  const bookId = req.params.id;

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
};

// 🗑️ Delete book (admin only)
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

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
};

// 📘 Get book status
exports.getBookStatus = async (req, res) => {
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
};

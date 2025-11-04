const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookStatus
} = require('../controllers/bookController');

// 📚 Public route - Get all books
router.get('/', getAllBooks);

// ➕ Admin route - Add a new book
router.post('/', authenticateToken, addBook);

// ✏️ Admin route - Update a book
router.put('/:id', authenticateToken, updateBook);

// 🗑️ Admin route - Delete a book
router.delete('/:id', authenticateToken, deleteBook);

// 📘 Public route - Get book status
router.get('/:id/status', getBookStatus);

module.exports = router;

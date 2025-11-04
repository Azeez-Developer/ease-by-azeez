const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  borrowBook,
  returnBook,
  getMyBorrows,
  getCurrentBorrows,
  updateDueDate
} = require('../controllers/borrowController');

// 📚 Borrow a book
router.post('/', authenticateToken, borrowBook);

// 🔁 Return a book
router.put('/return/:book_id', authenticateToken, returnBook);

// 📋 Get all books borrowed by logged-in user
router.get('/my-borrows', authenticateToken, getMyBorrows);

// 📌 Get currently borrowed books
router.get('/current', authenticateToken, getCurrentBorrows);

// ✏️ Update due date
router.put('/update-due/:book_id', authenticateToken, updateDueDate);

module.exports = router;

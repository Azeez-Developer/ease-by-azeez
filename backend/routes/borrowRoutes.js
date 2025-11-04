const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  borrowBook,
  returnBook,
  getMyBorrows,
  getCurrentBorrows,
  updateDueDate,
  getAllBorrows,
} = require('../controllers/borrowController');

// 📚 Borrow a book
router.post('/', authenticateToken, borrowBook);

// 🔁 Return a book (admin can return any; users return their own)
router.put('/return/:book_id', authenticateToken, returnBook);

// 📋 Logged-in user's borrows
router.get('/my-borrows', authenticateToken, getMyBorrows);

// 📌 Logged-in user's active borrows
router.get('/current', authenticateToken, getCurrentBorrows);

// 🧾 Admin: all borrow records
router.get('/all', authenticateToken, getAllBorrows);

// ✏️ Update due date (for the logged-in user’s active borrow)
router.put('/update-due/:book_id', authenticateToken, updateDueDate);

module.exports = router;

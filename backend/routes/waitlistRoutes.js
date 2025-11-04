const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  addToWaitlist,
  getWaitlistByBook,
  removeFromWaitlist
} = require('../controllers/waitlistController');

// 📝 Add user to waitlist
router.post('/', authenticateToken, addToWaitlist);

// 🔐 Get waitlist for a specific book (admin only)
router.get('/:book_id', authenticateToken, getWaitlistByBook);

// ❌ Remove user from waitlist
router.delete('/:book_id', authenticateToken, removeFromWaitlist);

module.exports = router;

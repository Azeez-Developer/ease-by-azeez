const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  submitDonation,
  getAllDonations,
  updateDonationStatus
} = require('../controllers/donationController');

// 📚 Public route - Submit new donation
router.post('/', submitDonation);

// 🔐 Admin route - View all donations
router.get('/', authenticateToken, getAllDonations);

// 🔄 Admin route - Update donation status
router.put('/:id', authenticateToken, updateDonationStatus);

module.exports = router;

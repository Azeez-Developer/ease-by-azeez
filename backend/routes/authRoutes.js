const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

// =============== REGISTER ===============
router.post('/register', registerUser);

// =============== LOGIN ===============
router.post('/login', loginUser);

// =============== UPDATE PROFILE ===============
router.put('/update-profile', authenticateToken, updateProfile);

module.exports = router;

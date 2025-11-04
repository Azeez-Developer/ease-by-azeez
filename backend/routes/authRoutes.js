const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

// ====================== PUBLIC ROUTES ======================

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// ====================== USER ROUTES ======================

// Update profile (requires login)
router.put('/update-profile', authenticateToken, updateProfile);

// ====================== ADMIN ROUTES ======================

// Get all users (admin only)
router.get('/users', authenticateToken, getAllUsers);

// Update user role (admin only)
router.put('/users/:id/role', authenticateToken, updateUserRole);

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;

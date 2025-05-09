const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authMiddleware');
const pool = require('../models/db');

// register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const newUser = await createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
  
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  });
  
  // ✏️ Update current user's name and email (authenticated)
router.put('/update-profile', authenticateToken, async (req, res) => {
  const { name, email, role } = req.body;
  const userId = req.user.userId;
  const isAdmin = req.user.role === 'admin';

  try {
    let result;

    if (isAdmin && role) {
      // Allow admin to update role too
      result = await pool.query(
        `UPDATE users
         SET name = $1, email = $2, role = $3
         WHERE id = $4
         RETURNING id, name, email, role`,
        [name, email, role, userId]
      );
    } else {
      // Regular users can only update name and email
      result = await pool.query(
        `UPDATE users
         SET name = $1, email = $2
         WHERE id = $3
         RETURNING id, name, email, role`,
        [name, email, userId]
      );
    }

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;

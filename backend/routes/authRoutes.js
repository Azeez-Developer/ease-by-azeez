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

  // only .edu users are allowed to sign up and borrow
  if (!email.toLowerCase().endsWith('.edu')) {
  return res.status(400).json({ message: 'Only .edu email addresses are allowed for registration.' });
}


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
  
  // ✅ Update profile route (flexible: name, email, password - optional)
router.put('/update-profile', authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.userId;

  try {
    // Get current user from DB
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    const updatedName = name ?? user.name;
    const updatedEmail = email ?? user.email;
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    // Run the update
    await pool.query(
      `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
      [updatedName, updatedEmail, updatedPassword, userId]
    );

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});


module.exports = router;

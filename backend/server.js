const pool = require('./models/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middlewares/authMiddleware');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const donationRoutes = require('./routes/donationRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/donations', donationRoutes);


app.get('/', (req, res) => {
  res.send('Ease by Azeez API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user  // shows decoded token info
  });
});


app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});

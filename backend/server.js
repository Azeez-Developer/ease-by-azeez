const express = require('express');
const cors = require('cors');
const pool = require('./models/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middlewares/authMiddleware');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const donationRoutes = require('./routes/donationRoutes');
const waitlistRoutes = require('./routes/waitlistRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/waitlist', waitlistRoutes);

// API routes
app.get('/', (req, res) => {
  res.send('Ease by Azeez API is running...');
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user
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

// ===============================
// 🔌 Socket.IO Setup (New)
// ===============================
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Expose io so routes can access it (req.app.get('io'))
app.set('io', io);

// Socket events
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

// ===============================
// 🧩 PostgreSQL Connection Test (Temporary for Day 1)
// ===============================
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to PostgreSQL at:', result.rows[0].now);
  }
});


// Start the HTTP server (not app.listen)
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

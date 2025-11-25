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

const PDFDocument = require('pdfkit');   // ✅ NEW — PDF generator
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
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
// 📄 NEW: EXPORT BOOKS AS PDF
// ===============================
app.get('/api/books/pdf', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT title, author, genre, status
      FROM books
      ORDER BY title ASC
    `);

    const books = result.rows;

    // Generate filename
    const timestamp = new Date().toISOString().split("T")[0];
    res.setHeader("Content-Disposition", `attachment; filename="ease-by-azeez-books-${timestamp}.pdf"`);
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    // Title
    doc
      .fontSize(20)
      .text("Ease by Azeez — Book Catalog", { align: "center" })
      .moveDown(1.2);

    // Table header
    doc.fontSize(13).text("Title", 50, doc.y, { continued: true })
      .text("Author", 200, doc.y, { continued: true })
      .text("Genre", 350, doc.y, { continued: true })
      .text("Status", 450, doc.y);

    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke();

    // Table rows
    books.forEach((book) => {
      doc.text(book.title, 50, doc.y + 10, { continued: true })
        .text(book.author, 200, doc.y, { continued: true })
        .text(book.genre, 350, doc.y, { continued: true })
        .text(book.status, 450, doc.y);
    });

    // Footer
    doc
      .moveDown(2)
      .fontSize(10)
      .text(`Generated on ${new Date().toLocaleString()}`, { align: "right" });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

// ===============================
// 🔌 Socket.IO Setup
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

// PostgreSQL Test
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to PostgreSQL at:', result.rows[0].now);
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

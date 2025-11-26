// controllers/bookController.js
const pool = require('../models/db');
const PDFDocument = require("pdfkit"); // ✅ NEW

// 📚 Get all books (public)
exports.getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// ➕ Add new book (admin only)
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can add books' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, genre)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, author, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Failed to add book' });
  }
};

// ✏️ Update book (admin only)
exports.updateBook = async (req, res) => {
  const { title, author, genre, status } = req.body;
  const bookId = req.params.id;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can update books' });
  }

  try {
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, genre = $3, status = $4
       WHERE id = $5
       RETURNING *`,
      [title, author, genre, status, bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Failed to update book' });
  }
};

// 🗑️ Delete book (admin only)
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete books' });
  }

  try {
    const result = await pool.query(
      `DELETE FROM books WHERE id = $1 RETURNING *`,
      [bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Failed to delete book' });
  }
};

// 📘 Get book status
exports.getBookStatus = async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await pool.query(
      'SELECT id, title, status FROM books WHERE id = $1',
      [bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching book status:', err);
    res.status(500).json({ message: 'Failed to fetch book status' });
  }
};

// ============================================
// 📄 Generate Clean Book Catalog PDF (NO FOOTER)
// ============================================
exports.generateBooksPDF = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books ORDER BY title ASC");
    const books = result.rows;

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 80, bottom: 50, left: 40, right: 40 }
    });

    // Set headers for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=books.pdf");

    doc.pipe(res);

    // --------------------------------------------
    // 📌 TITLE
    // --------------------------------------------
    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Ease by Azeez — Book Catalog", { align: "center" });

    doc.moveDown(1);

    // --------------------------------------------
    // 📋 TABLE HEADER
    // --------------------------------------------
    const tableTop = 130;

    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("Title", 40, tableTop);
    doc.text("Author", 220, tableTop);
    doc.text("Genre", 360, tableTop);
    doc.text("Status", 480, tableTop);

    // Header underline
    doc.moveTo(40, tableTop + 18)
      .lineTo(550, tableTop + 18)
      .strokeColor("#000")
      .lineWidth(1)
      .stroke();

    // --------------------------------------------
    // 📦 TABLE ROWS
    // --------------------------------------------
    let y = tableTop + 30;

    doc.fontSize(11).font("Helvetica");

    books.forEach((book) => {
      if (y > 760) {
        doc.addPage();
        y = 80;
      }

      doc.text(book.title, 40, y, { width: 160 });
      doc.text(book.author, 220, y, { width: 120 });
      doc.text(book.genre, 360, y, { width: 100 });
      doc.text(book.status, 480, y);

      y += 25;

      // Light row separator
      doc.moveTo(40, y)
        .lineTo(550, y)
        .strokeColor("#e0e0e0")
        .lineWidth(0.5)
        .stroke();

      y += 5;
    });

    // ❌ FOOTER REMOVED  
    // (No timestamp, no extra page)

    doc.end();

  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};


const pool = require('../models/db');

// 📚 Borrow a book (user)
exports.borrowBook = async (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.userId;
  const due_date = new Date();
  due_date.setDate(due_date.getDate() + 30);

  try {
    const bookCheck = await pool.query(
      'SELECT * FROM books WHERE id = $1 AND status = $2',
      [book_id, 'available']
    );
    if (bookCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Book is not available or does not exist' });
    }

    const borrow = await pool.query(
      `INSERT INTO borrows (user_id, book_id, due_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, book_id, due_date]
    );

    await pool.query(`UPDATE books SET status = 'borrowed' WHERE id = $1`, [book_id]);

    res.status(201).json(borrow.rows[0]);
  } catch (err) {
    console.error('Error borrowing book:', err);
    res.status(500).json({ message: 'Failed to borrow book' });
  }
};

// 🔁 Return a book (admin can return ANY, user can return OWN)
exports.returnBook = async (req, res) => {
  const user_id = req.user.userId;
  const user_role = req.user.role;
  const book_id = req.params.book_id;

  try {
    let result;

    if (user_role === 'admin') {
      // Admin: return regardless of who borrowed it
      result = await pool.query(
        `UPDATE borrows
         SET returned_at = CURRENT_TIMESTAMP
         WHERE book_id = $1 AND returned_at IS NULL
         RETURNING *`,
        [book_id]
      );
    } else {
      // Regular user: only return their own
      result = await pool.query(
        `UPDATE borrows
         SET returned_at = CURRENT_TIMESTAMP
         WHERE user_id = $1 AND book_id = $2 AND returned_at IS NULL
         RETURNING *`,
        [user_id, book_id]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No active borrow record found for this book' });
    }

    await pool.query(`UPDATE books SET status = 'available' WHERE id = $1`, [book_id]);

    const io = req.app.get('io');
    if (io) {
      io.emit('bookReturned', {
        book_id,
        message: 'A book has been returned and is now available!'
      });
    }

    res.json({ message: 'Book returned successfully', borrow: result.rows[0] });
  } catch (err) {
    console.error('Error returning book:', err);
    res.status(500).json({ message: 'Failed to return book' });
  }
};

// 📋 Get all books borrowed by the logged-in user
exports.getMyBorrows = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT br.id AS borrow_id, bk.title, bk.author, br.due_date, br.borrowed_at, br.returned_at, br.book_id
       FROM borrows br
       JOIN books bk ON br.book_id = bk.id
       WHERE br.user_id = $1
       ORDER BY br.borrowed_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching borrowed books:', err);
    res.status(500).json({ message: 'Failed to fetch borrowed books' });
  }
};

// 📌 Get currently borrowed books (not yet returned)
exports.getCurrentBorrows = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT br.id AS borrow_id, bk.title, bk.author, br.due_date, br.borrowed_at, br.book_id
       FROM borrows br
       JOIN books bk ON br.book_id = bk.id
       WHERE br.user_id = $1 AND br.returned_at IS NULL
       ORDER BY br.borrowed_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching current borrows:', err);
    res.status(500).json({ message: 'Failed to fetch active borrows' });
  }
};

// ✏️ Update due date
exports.updateDueDate = async (req, res) => {
  const { due_date } = req.body;
  const user_id = req.user.userId;
  const book_id = req.params.book_id;

  try {
    const result = await pool.query(
      `UPDATE borrows
       SET due_date = $1
       WHERE user_id = $2 AND book_id = $3 AND returned_at IS NULL
       RETURNING *`,
      [due_date, user_id, book_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Active borrow not found' });
    }

    res.json({ message: 'Due date updated', borrow: result.rows[0] });
  } catch (err) {
    console.error('Error updating due date:', err);
    res.status(500).json({ message: 'Failed to update due date' });
  }
};

// 🧾 Get all borrow records (Admin only)
exports.getAllBorrows = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const result = await pool.query(`
      SELECT br.id AS borrow_id,
             bk.title,
             bk.author,
             u.name AS user_name,
             u.email AS user_email,
             br.borrowed_at,
             br.due_date,
             br.returned_at,
             br.book_id
      FROM borrows br
      JOIN books bk ON br.book_id = bk.id
      JOIN users u ON br.user_id = u.id
      ORDER BY br.borrowed_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all borrows:', err);
    res.status(500).json({ message: 'Failed to fetch borrow records' });
  }
};

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'borrower', -- 'admin' or 'borrower'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKS TABLE
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100),
  genre VARCHAR(50),
  status VARCHAR(20) DEFAULT 'available', -- available, borrowed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BORROWS TABLE
CREATE TABLE IF NOT EXISTS borrows (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE NOT NULL,
  returned_at TIMESTAMP
);

-- DONATIONS TABLE
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(100),
    donor_name VARCHAR(100),
    donor_email VARCHAR(150),
    status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


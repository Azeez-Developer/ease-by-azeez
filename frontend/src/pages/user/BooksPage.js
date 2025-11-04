import React, { useEffect, useState } from 'react';
import './BooksPage.css';
import api from '../../services/api';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books'); // GET all books
        setBooks(response.data);
      } catch (err) {
        console.error('❌ Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-section text-center">
      <h1 className="books-title">Available Books</h1>
      <p className="books-subtext">
        Browse through the collection of free books you can borrow.
      </p>

      {loading ? (
        <div className="books-placeholder">
          <p>Loading books...</p>
        </div>
      ) : error ? (
        <div className="books-placeholder">
          <p className="error-text">{error}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="books-placeholder">
          <p>No books available at the moment.</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p className={`status ${book.status}`}>
                <strong>Status:</strong> {book.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;

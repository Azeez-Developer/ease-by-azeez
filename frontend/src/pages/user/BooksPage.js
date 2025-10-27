// src/pages/user/BooksPage.js
import React from 'react';
import './BooksPage.css';

const BooksPage = () => {
  return (
    <div className="books-section">
      <h1 className="books-title">Available Books 📚</h1>
      <p className="books-subtext">
        Browse through the collection of free books you can borrow.
      </p>
      <div className="books-placeholder">
        <p className="coming-soon">🚧 Book list coming soon...</p>
      </div>
    </div>
  );
};

export default BooksPage;

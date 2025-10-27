// src/pages/user/BooksPage.js
import React from "react";
import "./BooksPage.css";
import logo from "../../assets/ease-logo.png";

const BooksPage = () => {
  return (
    <div className="books-section text-center">
      {/* Centered Logo */}
      <img src={logo} alt="Ease by Azeez Logo" className="books-logo" />

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

// src/pages/user/BooksPage.js
import React from "react";
import "./BooksPage.css";
import logo from "../../assets/ease-logo.png";

const BooksPage = () => {
  return (
    <div className="section-container">
      {/* Centered Logo */}
      <img src={logo} alt="Ease by Azeez Logo" className="section-logo" />

      <h1 className="section-title">Available Books 📚</h1>
      <p className="section-subtext">
        Browse through the collection of free books you can borrow.
      </p>

      <div className="section-placeholder">
        <p>🚧 Book list coming soon...</p>
      </div>
    </div>
  );
};

export default BooksPage;

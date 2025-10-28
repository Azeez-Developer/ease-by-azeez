// src/pages/user/DonatePage.js
import React from "react";
import "./DonatePage.css";
import logo from "../../assets/ease-logo.png";

const DonatePage = () => {
  return (
    <div className="section-container">
      {/* Centered Logo */}
      <img src={logo} alt="Ease by Azeez Logo" className="section-logo" />

      <h1 className="section-title">Donate a Book 📚</h1>
      <p className="section-subtext">
        Give your books a second life by donating them to fellow students.
      </p>

      <div className="section-placeholder">
        <p>🎁 Donation form coming soon!</p>
      </div>
    </div>
  );
};

export default DonatePage;

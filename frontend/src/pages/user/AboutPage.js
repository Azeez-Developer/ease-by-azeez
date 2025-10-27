// src/pages/user/AboutPage.js
import React from 'react';
import logo from '../../assets/ease-logo.png'; // Adjust if needed
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-section text-center">
      <img src={logo} alt="Ease by Azeez Logo" className="about-logo" />
      <h1 className="about-title">About Ease by Azeez</h1>
      <div className="about-text">
        <p>
          <strong>Ease by Azeez</strong> is a free book-sharing platform created to support college students by giving them easy access to books without any cost.
        </p>
        <p>
          This is a completely <strong>nonprofit initiative</strong> — no fees, no charges, and no catch.
          The goal is simple: help students succeed by sharing knowledge and reducing the cost of education.
        </p>
        <p>
          Whether you're borrowing, donating, or just exploring, <strong>thank you</strong> for being part of this mission.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

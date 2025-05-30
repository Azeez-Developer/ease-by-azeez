// src/pages/HomePage.js
import React from 'react';
import logo from '../assets/ease-logo.png';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="hero-section text-center">
      <img src={logo} alt="Ease by Azeez Logo" className="hero-logo" />
      <h1 className="hero-title">Welcome to Ease by Azeez 📚</h1>
      <p className="hero-subtext">
        Borrow books for free. Donate knowledge. Empower students.
      </p>
      <div className="hero-buttons">
        <a href="/books" className="btn btn-primary">Browse Books</a>
        <a href="/donate" className="btn btn-outline-secondary">Donate Books</a>
      </div>
    </div>
  );
};

export default HomePage;

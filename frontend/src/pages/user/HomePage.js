// src/pages/user/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-section text-center">
      {/* === Hero Section === */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Ease by Azeez 📚</h1>

        {/* === About / Intro Text === */}
        <div className="about-text">
          <p>
            <strong>Ease by Azeez</strong> is a free book-sharing platform created to support
            college students by giving them easy access to books without any cost.
          </p>
          <p>
            This is a completely <strong>nonprofit initiative</strong> — no fees, no charges,
            and no catch. The goal is simple: help students succeed by sharing knowledge and
            reducing the cost of education.
          </p>
          <p>
            Whether you're borrowing, donating, or just exploring,
            <strong> thank you</strong> for being part of this mission.
          </p>
        </div>

        {/* === Tagline & Buttons === */}
        <p className="hero-subtext">
          Borrow books for free. Donate knowledge. Empower students.
        </p>

        <div className="hero-buttons">
          <a href="/books" className="btn btn-primary">Browse Books</a>
          <a href="/donate" className="btn btn-outline-secondary">Donate Books</a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

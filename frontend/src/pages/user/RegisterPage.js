// src/pages/user/RegisterPage.js
import React from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-section text-center">
      <h1 className="register-title">Create Your Account</h1>
      <p className="register-subtext">
        Join Ease by Azeez to borrow, donate, and share books with students.
      </p>

      <div className="register-box">
        <form className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>

          <button type="submit" className="btn-register">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

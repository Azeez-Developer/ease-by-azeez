// src/pages/user/LoginPage.js
import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-section text-center">
      <h1 className="login-title">Login to Ease by Azeez</h1>
      <p className="login-subtext">
        Access your account to borrow or manage your books.
      </p>

      <div className="login-box">
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="btn-login">Login</button>
        </form>
        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

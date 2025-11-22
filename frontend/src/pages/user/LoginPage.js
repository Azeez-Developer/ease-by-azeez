// src/pages/user/LoginPage.js
import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import api from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // ⚠️ Detect "session expired" redirect message
  useEffect(() => {
    if (location.state?.reason === "session_expired") {
      setError("Your session has expired. Please log in again.");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setError('');

      // 🔥 Send login request
      const response = await api.post('/auth/login', { email, password });

      // 🔐 Save to sessionStorage (clear when browser closes)
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      // ⏱ Start inactivity timer on login
      sessionStorage.setItem('lastActivity', Date.now().toString());

      console.log('✅ Login successful:', response.data);

      // 🔁 If redirected from protected page → go back
      const redirectTo = location.state?.from?.pathname || '/';

      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error('❌ Login error:', err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';

      setError(message);
    }
  };

  return (
    <div className="login-section text-center">
      <h1 className="login-title">Login</h1>
      <p className="login-subtext">
        Access your account to borrow or manage your books.
      </p>

      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

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

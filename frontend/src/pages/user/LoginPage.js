import React, { useState } from 'react';
import './LoginPage.css';
import api from '../../services/api'; // centralized API connection
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setError('');

      // Send login request to backend
      const response = await api.post('/auth/login', { email, password });

      // Save token + user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('✅ Login successful:', response.data);

      // Redirect user based on role
      navigate('/');


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

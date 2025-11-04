// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';

// 🧭 User Pages
import HomePage from './pages/user/HomePage';
import BooksPage from './pages/user/BooksPage';
import DonatePage from './pages/user/DonatePage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import AboutPage from './pages/user/AboutPage';

// 🛠 Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ManageBooksPage from './pages/admin/ManageBooksPage';
import ManageDonationsPage from './pages/admin/ManageDonationsPage';
import BorrowRequestsPage from './pages/admin/BorrowRequestsPage';
import UsersSettingsPage from './pages/admin/UsersSettingsPage';

// 🔒 Security Components
import ProtectedRoute from './components/ProtectedRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';

function App() {
  // Retrieve logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Router>
      <AppNavbar user={user} />

      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        {/* 🔐 Admin-Only Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute role="admin">
              <ManageBooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute role="admin">
              <ManageDonationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrow-requests"
          element={
            <ProtectedRoute role="admin">
              <BorrowRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UsersSettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

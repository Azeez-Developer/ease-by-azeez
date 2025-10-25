// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminManageBooksPage from './pages/AdminManageBooksPage';
import AdminManageDonationsPage from './pages/AdminManageDonationsPage';
import AdminBorrowRequestsPage from './pages/AdminBorrowRequestsPage';
import AdminUsersSettingsPage from './pages/AdminUsersSettingsPage';


function App() {
// fake user for testing the dashboard
const user = { role: 'admin' };

  return (
    <Router>
      <AppNavbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />

        {/* Admin routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/books" element={<AdminManageBooksPage />} />
            <Route path="/admin/donations" element={<AdminManageDonationsPage />} />
            <Route path="/admin/borrow-requests" element={<AdminBorrowRequestsPage />} />
            <Route path="/admin/users" element={<AdminUsersSettingsPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

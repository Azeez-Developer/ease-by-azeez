// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import HomePage from './pages/user/HomePage';
import BooksPage from './pages/user/BooksPage';
import DonatePage from './pages/user/DonatePage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import AboutPage from './pages/user/AboutPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageBooksPage from './pages/admin/ManageBooksPage';
import ManageDonationsPage from './pages/admin/ManageDonationsPage';
import BorrowRequestsPage from './pages/admin/BorrowRequestsPage';
import UsersSettingsPage from './pages/admin/UsersSettingsPage';


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
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Admin routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/books" element={<ManageBooksPage />} />
            <Route path="/admin/donations" element={<ManageDonationsPage />} />
            <Route path="/admin/borrow-requests" element={<BorrowRequestsPage />} />
            <Route path="/admin/users" element={<UsersSettingsPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

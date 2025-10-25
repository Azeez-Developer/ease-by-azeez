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


function App() {
// fake user for testing the dashboard
// add bellow line before the return
// const user = { role: 'admin' }; // temporary for testing make sure your component is accepting the user prop
// then add below line
// <AppNavbar user={user} />
// instead of 
// <AppNavbar  />
// for testing the admind dashboard

  return (
    <Router>
      <AppNavbar  />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

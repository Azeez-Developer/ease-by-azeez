// src/pages/AdminDashboardPage.js
import React from 'react';
import './AdminDashboardPage.css'; // Create this CSS file
import logo from '../assets/ease-logo.png';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard container py-5">
      <div className="text-center mb-4">
        <img src={logo} alt="Ease by Azeez Logo" className="admin-logo" />
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtext">
          Manage all books, donations, borrowers, and system settings from one place.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Manage Books</h3>
          <p>View, update, and remove books in the system.</p>
          <button className="btn btn-primary">Go to Books</button>
        </div>
        <div className="dashboard-card">
          <h3>Manage Donations</h3>
          <p>Review incoming donated books and add them to the catalog.</p>
          <button className="btn btn-primary">Go to Donations</button>
        </div>
        <div className="dashboard-card">
          <h3>Borrow Requests</h3>
          <p>View current borrowing activities and approve returns.</p>
          <button className="btn btn-primary">Go to Borrow Logs</button>
        </div>
        <div className="dashboard-card">
          <h3>Users & Settings</h3>
          <p>Manage users and configure system preferences.</p>
          <button className="btn btn-primary">Go to Users</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

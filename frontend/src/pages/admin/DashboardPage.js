// src/pages/admin/DashboardPage.js
import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="dashboard-section text-center">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtext">
            Manage all books, donations, borrowers, and system settings from one place.
          </p>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Manage Books</h3>
              <p>View, update, and remove books in the system.</p>
              <Link to="/admin/books" className="btn btn-primary">Go to Books</Link>
            </div>

            <div className="dashboard-card">
              <h3>Manage Donations</h3>
              <p>Review incoming donated books and add them to the catalog.</p>
              <Link to="/admin/donations" className="btn btn-primary">Go to Donations</Link>
            </div>

            <div className="dashboard-card">
              <h3>Borrow Requests</h3>
              <p>View current borrowing activities and approve returns.</p>
              <Link to="/admin/borrow-requests" className="btn btn-primary">Go to Borrow Requests</Link>
            </div>

            <div className="dashboard-card">
              <h3>Users & Settings</h3>
              <p>Manage users and configure system preferences.</p>
              <Link to="/admin/users" className="btn btn-primary">Go to Users</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;

// src/pages/admin/ManageBooksPage.js
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageBooksPage.css";
import logo from "../../assets/ease-logo.png";

const ManageBooksPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-container text-center">
          {/* Centered Logo */}
          <img src={logo} alt="Ease by Azeez Logo" className="admin-logo" />

          <h1 className="admin-page-title">Manage Books 📚</h1>
          <p className="admin-page-subtext">
            View, update, add, and remove books in the system.
          </p>

          <div className="admin-placeholder">
            <p>📖 Book management features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooksPage;

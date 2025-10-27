// src/pages/admin/UsersSettingsPage.js
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./UsersSettingsPage.css";
import logo from "../../assets/ease-logo.png";

const UsersSettingsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-container text-center">
          {/* Centered Logo */}
          <img src={logo} alt="Ease by Azeez Logo" className="admin-logo" />

          <h1 className="admin-page-title">Users & Settings ⚙️</h1>
          <p className="admin-page-subtext">
            Manage user accounts, roles, permissions, and update system
            configurations to keep the library running smoothly.
          </p>

          <div className="admin-placeholder">
            <p>👥 User management and settings features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSettingsPage;

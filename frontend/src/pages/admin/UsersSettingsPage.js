import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./UsersSettingsPage.css";

const UsersSettingsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Users & Settings</h1>
          <p className="admin-subtext">
            Manage user accounts, roles, permissions, and update system
            configurations to keep the library running smoothly.
          </p>

          <div className="admin-placeholder">
            <p>User management and settings features coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsersSettingsPage;

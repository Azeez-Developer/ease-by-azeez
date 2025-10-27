// src/pages/admin/ManageDonationsPage.js
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageDonationsPage.css";
import logo from "../../assets/ease-logo.png";

const ManageDonationsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-container text-center">
          {/* Centered Logo */}
          <img src={logo} alt="Ease by Azeez Logo" className="admin-logo" />

          <h1 className="admin-page-title">Manage Donations 🎁</h1>
          <p className="admin-page-subtext">
            Review and approve donated books before adding them to the library.
          </p>

          <div className="admin-placeholder">
            <p>🎀 Donation management features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDonationsPage;

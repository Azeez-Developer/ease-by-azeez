// src/pages/admin/BorrowRequestsPage.js
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./BorrowRequestsPage.css";
import logo from "../../assets/ease-logo.png";

const BorrowRequestsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-container text-center">
          {/* Centered Logo */}
          <img src={logo} alt="Ease by Azeez Logo" className="admin-logo" />

          <h1 className="admin-page-title">Borrow Requests 🔄</h1>
          <p className="admin-page-subtext">
            View all active borrowing requests, approve or mark returns, and
            manage book circulation.
          </p>

          <div className="admin-placeholder">
            <p>📚 Borrow request management features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowRequestsPage;

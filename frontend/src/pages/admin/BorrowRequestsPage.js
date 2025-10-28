import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./BorrowRequestsPage.css";

const BorrowRequestsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Borrow Requests</h1>
          <p className="admin-subtext">
            View all active borrowing requests, approve or mark returns, and
            manage book circulation.
          </p>

          <div className="admin-placeholder">
            <p>Borrow request management features coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BorrowRequestsPage;

import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageBooksPage.css";

const ManageBooksPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Manage Books</h1>
          <p className="admin-subtext">
            View, update, add, and remove books in the system.
          </p>

          <div className="admin-placeholder">
            <p>Book management features coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageBooksPage;

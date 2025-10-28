import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageDonationsPage.css";

const ManageDonationsPage = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Manage Donations</h1>
          <p className="admin-subtext">
            Review and approve donated books before adding them to the library.
          </p>

          <div className="admin-placeholder">
            <p>Donation management features coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageDonationsPage;

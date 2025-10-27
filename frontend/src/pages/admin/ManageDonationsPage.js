// src/pages/Admin/ManageDonationsPage.js
import React from 'react';
import './ManageDonationsPage.css';

const AdminManageDonationsPage = () => {
  return (
    <div className="manage-donations-container">
      <h2>Manage Donations</h2>
      <p>This section will allow admins to review and accept/reject donated books.</p>

      {/* Placeholder for donation table */}
      <div className="donations-placeholder">
        <p>📦 List of donated books will appear here.</p>
      </div>
    </div>
  );
};

export default AdminManageDonationsPage;

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageDonationsPage.css";
import api from "../../services/api";

const ManageDonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all donations (admin only)
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/donations"); // JWT auto-injected via interceptor
      setDonations(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching donations:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to load donations. (Admin access required)";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Approve or reject donation
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await api.put(`/donations/${id}`, { status });
      console.log(`✅ Donation ${status}:`, response.data);
      setSuccess(`Donation ${status} successfully!`);
      setError("");
      fetchDonations(); // refresh list
    } catch (err) {
      console.error(`❌ Error updating donation:`, err);
      const msg =
        err.response?.data?.message ||
        `Failed to ${status} donation. (Admin access required)`;
      setError(msg);
      setSuccess("");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Manage Donations</h1>
          <p className="admin-subtext">
            Review and approve donated books before adding them to the library.
          </p>

          {loading ? (
            <div className="admin-placeholder">
              <p>Loading donations...</p>
            </div>
          ) : error ? (
            <div className="admin-placeholder">
              <p className="error-text">{error}</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="admin-placeholder">
              <p>No donations found.</p>
            </div>
          ) : (
            <div className="donations-table-container">
              {success && <p className="success-text">{success}</p>}

              <table className="donations-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Donor Name</th>
                    <th>Donor Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id}>
                      <td>{donation.title}</td>
                      <td>{donation.author}</td>
                      <td>{donation.genre}</td>
                      <td>{donation.donor_name}</td>
                      <td>{donation.donor_email}</td>
                      <td>
                        <span
                          className={`status ${
                            donation.status || "pending"
                          }`}
                        >
                          {donation.status || "pending"}
                        </span>
                      </td>
                      <td>
                        {donation.status === "approved" ? (
                          <span className="approved-text">Approved</span>
                        ) : donation.status === "rejected" ? (
                          <span className="rejected-text">Rejected</span>
                        ) : (
                          <>
                            <button
                              className="btn-approve"
                              onClick={() =>
                                handleStatusUpdate(donation.id, "approved")
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="btn-reject"
                              onClick={() =>
                                handleStatusUpdate(donation.id, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ManageDonationsPage;

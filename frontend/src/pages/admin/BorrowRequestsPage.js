import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./BorrowRequestsPage.css";
import api from "../../services/api";

const BorrowRequestsPage = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all borrow requests
  const fetchBorrows = async () => {
    try {
      const response = await api.get("/borrow/my-borrows");
      setBorrows(response.data);
    } catch (err) {
      console.error("❌ Error fetching borrow requests:", err);
      setError("Failed to load borrow requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  // Handle return book
  const handleReturn = async (bookId) => {
    try {
      const response = await api.put(`/borrow/return/${bookId}`);
      console.log("✅ Book returned:", response.data);
      setSuccess("Book marked as returned successfully!");
      setError("");
      fetchBorrows();
    } catch (err) {
      console.error("❌ Error returning book:", err);
      setError("Failed to mark book as returned.");
    }
  };

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

          {loading ? (
            <div className="admin-placeholder">
              <p>Loading borrow requests...</p>
            </div>
          ) : error ? (
            <div className="admin-placeholder">
              <p className="error-text">{error}</p>
            </div>
          ) : borrows.length === 0 ? (
            <div className="admin-placeholder">
              <p>No active borrow requests found.</p>
            </div>
          ) : (
            <div className="borrow-table-container">
              {success && <p className="success-text">{success}</p>}

              <table className="borrow-table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Borrowed By</th>
                    <th>Borrowed At</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((borrow) => (
                    <tr key={borrow.borrow_id}>
                      <td>{borrow.title}</td>
                      <td>{borrow.author}</td>
                      <td>{borrow.user_name || "N/A"}</td>
                      <td>{new Date(borrow.borrowed_at).toLocaleDateString()}</td>
                      <td>{new Date(borrow.due_date).toLocaleDateString()}</td>
                      <td>
                        {borrow.returned_at ? (
                          <span className="status returned">Returned</span>
                        ) : (
                          <span className="status active">Borrowed</span>
                        )}
                      </td>
                      <td>
                        {!borrow.returned_at && (
                          <button
                            className="btn-return"
                            onClick={() => handleReturn(borrow.book_id)}
                          >
                            Mark Returned
                          </button>
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

export default BorrowRequestsPage;

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./UsersSettingsPage.css";
import api from "../../services/api";

const UsersSettingsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/users"); // you'll create this endpoint later
      setUsers(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change user role
  const handleRoleChange = async (userId, role) => {
    try {
      await api.put(`/auth/users/${userId}/role`, { role });
      setSuccess(`User role updated to ${role}`);
      fetchUsers();
    } catch (err) {
      console.error("❌ Error updating role:", err);
      setError("Failed to update user role.");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/auth/users/${userId}`);
      setSuccess("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Users & Settings</h1>
          <p className="admin-subtext">
            Manage user accounts, roles, and permissions to keep the system running smoothly.
          </p>

          {loading ? (
            <div className="admin-placeholder">
              <p>Loading users...</p>
            </div>
          ) : error ? (
            <div className="admin-placeholder">
              <p className="error-text">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="admin-placeholder">
              <p>No users found.</p>
            </div>
          ) : (
            <div className="users-table-container">
              {success && <p className="success-text">{success}</p>}

              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`role ${user.role === "admin" ? "admin" : "user"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {user.role !== "admin" ? (
                          <button
                            className="btn-promote"
                            onClick={() => handleRoleChange(user.id, "admin")}
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            className="btn-demote"
                            onClick={() => handleRoleChange(user.id, "user")}
                          >
                            Demote
                          </button>
                        )}
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
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

export default UsersSettingsPage;

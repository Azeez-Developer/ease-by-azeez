// src/components/AdminSidebar.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
import logo from "../assets/ease-logo.png";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Open by default on desktop

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Automatically handle resize behavior (open on desktop, closed on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger toggle (visible on mobile) */}
      <button
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar Drawer */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Ease by Azeez Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
          >
            📚 Manage Books
          </NavLink>

          <NavLink
            to="/admin/donations"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
          >
            🎁 Manage Donations
          </NavLink>

          <NavLink
            to="/admin/borrow-requests"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
          >
            🔄 Borrow Requests
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
          >
            👥 Users & Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>Ease by Azeez © 2025</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default AdminSidebar;

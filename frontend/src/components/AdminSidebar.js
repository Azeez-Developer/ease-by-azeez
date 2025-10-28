import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar on resize if necessary
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      {/* Always visible hamburger button */}
      <button
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar Drawer */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Manage Books
          </NavLink>

          <NavLink
            to="/admin/donations"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Manage Donations
          </NavLink>

          <NavLink
            to="/admin/borrow-requests"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Borrow Requests
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Users & Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>Ease by Azeez © 2025</p>
        </div>
      </aside>

      {/* Dim overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default AdminSidebar;

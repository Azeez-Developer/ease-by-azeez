import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    document
      .querySelector(".admin-layout")
      ?.classList.toggle("sidebar-open", !isOpen);
  };

  // ✅ Close sidebar & remove "sidebar-open" class on resize or unmount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        document.querySelector(".admin-layout")?.classList.remove("sidebar-open");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.querySelector(".admin-layout")?.classList.remove("sidebar-open");
    };
  }, []);

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
            onClick={toggleSidebar}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={toggleSidebar}
          >
            Manage Books
          </NavLink>

          <NavLink
            to="/admin/donations"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={toggleSidebar}
          >
            Manage Donations
          </NavLink>

          <NavLink
            to="/admin/borrow-requests"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={toggleSidebar}
          >
            Borrow Requests
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={toggleSidebar}
          >
            Users & Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>Ease by Azeez © 2025</p>
        </div>
      </aside>

      {/* Dim overlay (closes sidebar on click) */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default AdminSidebar;

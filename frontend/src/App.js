// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import AppNavbar from "./components/Navbar";
import SessionWarningModal from "./components/SessionWarningModal";

// User Pages
import HomePage from "./pages/user/HomePage";
import BooksPage from "./pages/user/BooksPage";
import DonatePage from "./pages/user/DonatePage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import AboutPage from "./pages/user/AboutPage";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import ManageBooksPage from "./pages/admin/ManageBooksPage";
import ManageDonationsPage from "./pages/admin/ManageDonationsPage";
import BorrowRequestsPage from "./pages/admin/BorrowRequestsPage";
import UsersSettingsPage from "./pages/admin/UsersSettingsPage";

// Security
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDeniedPage from "./pages/AccessDeniedPage";

function AppWrapper() {
  const navigate = useNavigate();

  // Modal State
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 min
    const WARNING_TIME = 60 * 1000; // show warning 1 min before logout

    let logoutTimer;
    let warningTimer;
    let countdownInterval;

    const resetTimers = () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);

      setShowWarning(false);

      // 🟡 Show warning at: T - 60 seconds
      warningTimer = setTimeout(() => {
        setShowWarning(true);
        setSecondsLeft(60);

        countdownInterval = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
            }
            return prev - 1;
          });
        }, 1000);
      }, INACTIVITY_LIMIT - WARNING_TIME);

      // 🔴 Auto logout
      logoutTimer = setTimeout(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login", { replace: true, state: { reason: "session_expired" } });
      }, INACTIVITY_LIMIT);
    };

    resetTimers();

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((evt) => window.addEventListener(evt, resetTimers));

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    });

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);
      events.forEach((evt) => window.removeEventListener(evt, resetTimers));
    };
  }, [navigate]);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <>
      {showWarning && (
        <SessionWarningModal
          secondsLeft={secondsLeft}
          onStayLoggedIn={() => {
            setShowWarning(false);
            // fire activity to reset timer
            window.dispatchEvent(new Event("mousemove"));
          }}
          onLogout={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            navigate("/login");
          }}
        />
      )}

      <AppNavbar user={user} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute role="admin">
              <ManageBooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute role="admin">
              <ManageDonationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrow-requests"
          element={
            <ProtectedRoute role="admin">
              <BorrowRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UsersSettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  // 🔐 Read session token & user
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  // ❌ No token = session expired → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, reason: "session_expired" }}
      />
    );
  }

  // 🚫 Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;

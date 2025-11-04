// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();

  // ❌ No token — redirect to login and remember where user tried to go
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⚠️ Role mismatch — user logged in but lacks permissions
  if (role && user.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;

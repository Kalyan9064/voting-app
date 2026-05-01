import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Decode JWT without any library
const parseJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded;
  } catch (err) {
    return null;
  }
};

// ✅ Check if token is valid and not expired
const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = parseJwt(token);
  if (!decoded) return false;

  // Check expiry — exp is in seconds, Date.now() is in milliseconds
  const currentTime = Date.now() / 1000;
  if (decoded.exp && decoded.exp < currentTime) {
    return false; // ✅ Token expired
  }

  return true;
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ Check token validity not just existence
  if (!isTokenValid(token)) {
    localStorage.removeItem("token");  // ✅ Clean up expired/invalid token
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  // ✅ Check admin role
  if (adminOnly && role !== "admin") {
    return <Navigate to="/voter-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
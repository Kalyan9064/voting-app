import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; // your root app (optional)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VoterDashboard from "./pages/VoterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ResultsPage from "./pages/ResultsPage";
import Profile from "./pages/UserProfile";
import UpdatePassword from "./pages/UpdatePassword";
import "./styles/ui.css";

import ProtectedRoute from "./ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected - Voter */}
      <Route path="/voter-dashboard" element={<ProtectedRoute><VoterDashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />

      {/* Admin-only */}
      <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

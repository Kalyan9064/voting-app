import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "linear-gradient(180deg,#f8fafc,#eef2ff)"
    }}>
      <div style={{
        maxWidth: 900,
        width: "100%",
        background: "white",
        borderRadius: 12,
        padding: 30,
        boxShadow: "0 8px 30px rgba(2,6,23,0.08)"
      }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>🗳️ Voting App</h1>
        <p style={{ color: "#475569", marginBottom: 20 }}>
          Simple and secure voting system. Create an account with Aadhar, login,
          view candidates, cast your vote and check real-time results.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            🚀 Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

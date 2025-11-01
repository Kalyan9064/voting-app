import React, { useEffect, useState } from "react";
import API from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile. Please login again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!user) {
    return <p style={{ padding: "2rem", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        borderRadius: "10px",
        background: "#f8f9fa",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>👤 User Profile</h2>

      <div
        style={{
          padding: "15px",
          background: "white",
          borderRadius: "8px",
          marginBottom: "15px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
        <p><strong>Mobile:</strong> {user.mobile || "Not Provided"}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Aadhar Number:</strong> {user.aadharCardNumber}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p>
          <strong>Voted:</strong> {user.idVoted ? "✅ Yes" : "❌ Not Yet"}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => (window.location.href = "/update-password")}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#6f42c1",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔒 Update Password
        </button>

        <button
          onClick={() => (window.location.href = "/voter-dashboard")}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ⬅️ Back to Dashboard
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

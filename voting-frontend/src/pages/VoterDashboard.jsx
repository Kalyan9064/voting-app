import React, { useEffect, useState } from "react";
import API from "../api/api";

const VoterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [voted, setVoted] = useState(false);

  // ✅ Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidate");
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  // ✅ Vote for a candidate
  const handleVote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/candidate/vote/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Vote submitted successfully!");
      setVoted(true);
      fetchCandidates();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMessage("❌ " + err.response.data.message);
      } else {
        setMessage("❌ Unable to vote. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>🗳️ Voter Dashboard</h2>
      <p>Welcome! Please vote for your preferred candidate.</p>

      {message && <p style={{ color: voted ? "green" : "red" }}>{message}</p>}

      <ul>
        {candidates.map((c) => (
          <li
            key={c._id}
            style={{
              marginBottom: "1rem",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <strong>{c.name}</strong> — {c.party} ({c.voteCount || 0} votes)
            <br />
            <button
              onClick={() => handleVote(c._id)}
              disabled={voted}
              style={{
                marginTop: "8px",
                padding: "6px 10px",
                backgroundColor: voted ? "#999" : "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: voted ? "not-allowed" : "pointer",
              }}
            >
              {voted ? "Voted" : "Vote"}
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Results Button */}
      <button
        onClick={() => (window.location.href = "/results")}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        📊 See Results
      </button>

      {/* ✅ Profile + Update Password + Logout */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={() => (window.location.href = "/profile")}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          👤 My Profile
        </button>

        {/* <button
          onClick={() => (window.location.href = "/update-password")}
          style={{
            padding: "10px 15px",
            backgroundColor: "#6f42c1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔒 Update Password
        </button> */}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            padding: "10px 15px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
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

export default VoterDashboard;

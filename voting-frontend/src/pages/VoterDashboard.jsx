import React, { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";
import Button from "../components/Button";
import CandidateCard from "../components/CandidateCard";  // ✅ Added
import Loader from "../components/Loader";                // ✅ Added

export default function VoterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [popup, setPopup] = useState("");
  const [loading, setLoading] = useState(true);  // ✅ Added

  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidate");
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    } finally {
      setLoading(false);  // ✅ Added
    }
  };

  const checkUserVoteStatus = async () => {
    try {
      const res = await API.get("/user/profile");
      if (res.data.user.idVoted === true) {
        setVoted(true);
      }
    } catch (err) {
      console.error("Error checking vote status:", err);
    }
  };

  const handleVote = async (id) => {
    if (voted) {
      setPopup("❌ You have already voted!");
      setTimeout(() => setPopup(""), 2500);
      return;
    }

    try {
      await API.post(`/candidate/vote/${id}`, {});
      setPopup("✅ Vote submitted successfully!");
      setVoted(true);
      fetchCandidates();
      setTimeout(() => setPopup(""), 2500);
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Failed to vote. Try again.";
      setPopup(msg);
      setTimeout(() => setPopup(""), 2500);
    }
  };

  useEffect(() => {
    fetchCandidates();
    checkUserVoteStatus();
  }, []);

  return (
    <Layout>

      {/* Page Header */}
      <div className="page-hero">
        <div>
          <h2>🗳️ Candidates</h2>
          <div className="text-muted">Choose your preferred candidate below</div>
        </div>

        <div className="row">
          <Button onClick={() => (window.location.href = "/results")}>
            📊 See Results
          </Button>
          <Button onClick={() => (window.location.href = "/profile")}>
            👤 My Profile
          </Button>
        </div>
      </div>

      {/* Popup Message */}
      {popup && (
        <div style={{
          marginBottom: "20px",
          padding: "12px",
          background: popup.includes("✅") ? "#e5ffe6" : "#ffe6e6",
          color: popup.includes("✅") ? "#0a7a00" : "#b30000",
          fontWeight: "600",
          borderRadius: "8px",
          border: popup.includes("✅") ? "1px solid #86ff9b" : "1px solid #ffb4b4",
          textAlign: "center",
        }}>
          {popup}
        </div>
      )}

      {/* ✅ Loader while fetching */}
      {loading && <Loader message="Fetching candidates..." />}

      {/* ✅ Candidate Grid using CandidateCard */}
      {!loading && (
        <div className="grid">
          {candidates.map((c) => (
            <CandidateCard
              key={c._id}
              candidate={c}
              onVote={handleVote}
              voted={voted}
            />
          ))}
        </div>
      )}

      {/* Logout */}
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "/login";
        }}>
          🚪 Logout
        </Button>
      </div>

    </Layout>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";

const VotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all candidates
  useEffect(() => {
    axios
      .get("http://localhost:3000/candidate")
      .then((res) => setCandidates(res.data))
      .catch(() => setMessage("Failed to load candidates ❌"));
  }, []);

  // Cast vote function
  const handleVote = async (candidateId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/candidate/vote",
        { candidateId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message || "Vote submitted successfully ✅");
    } catch (err) {
      setMessage("You have already voted or something went wrong ❌");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🗳️ Vote for Your Candidate</h2>
      {message && <p>{message}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {candidates.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
              textAlign: "center",
            }}
          >
            <h3>{c.name}</h3>
            <p>Party: {c.party}</p>
            <button onClick={() => handleVote(c._id)}>Vote 🗳️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotePage;

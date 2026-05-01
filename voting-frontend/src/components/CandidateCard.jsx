import React from "react";
import Button from "./Button";

export default function CandidateCard({ candidate, onVote, voted }) {
  return (
    <div className="card">
      <div className="candidate">

        {/* Avatar */}
        <div className="avatar">
          {(candidate.name || "C").slice(0, 2).toUpperCase()}
        </div>

        <div className="candidate-details">
          <div className="candidate-name">{candidate.name}</div>
          <div className="candidate-party">{candidate.party}</div>
          <div className="text-muted" style={{ fontSize: 13 }}>
            Age: {candidate.age}
          </div>

          <div className="vote-row" style={{ marginTop: 10 }}>
            <Button
              variant="primary"
              onClick={() => onVote(candidate._id)}
              disabled={voted}
              style={{ opacity: voted ? 0.5 : 1, cursor: voted ? "not-allowed" : "pointer" }}
            >
              {voted ? "✅ Voted" : "🗳️ Vote"}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
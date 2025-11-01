import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="card" style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>Welcome to the Voting App</h2>
          <p className="text-muted" style={{ marginTop: 8 }}>
            A secure, simple voting system. Register with Aadhar, login and cast your vote. Live results available.
          </p>

          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <Button variant="primary" onClick={() => window.location.href = "/login"}>🚀 Get Started</Button>
            <Button onClick={() => window.location.href = "/results"}>📊 See Results</Button>
          </div>
        </div>

        <div style={{ width: 200 }}>
          <div style={{
            borderRadius: 12, padding: 18, background: "linear-gradient(180deg,#f0fff4,#e9fff1)", textAlign: "center"
          }}>
            <h3 style={{ margin: 0, color: "var(--accent)" }}>Vote Safely</h3>
            <p className="muted" style={{ marginTop: 6 }}>Transparent counts · Protected accounts</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

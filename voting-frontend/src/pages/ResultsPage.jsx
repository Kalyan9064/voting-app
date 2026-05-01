import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import API from "../api/api";  // ✅ Fixed: using shared API instance
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Fixed: using API instance instead of raw fetch + hardcoded URL
    API.get("/candidate/vote/count")
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load results");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <Card title="🗳️ Election Results">

        {/* ✅ Loading state */}
        {loading && (
          <div className="text-muted" style={{ textAlign: "center", padding: 20 }}>
            Loading results...
          </div>
        )}

        {/* ✅ Error state */}
        {error && (
          <div style={{
            padding: "10px 14px",
            borderRadius: 8,
            background: "#ffe6e6",
            color: "#b30000",
            fontWeight: 600,
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* ✅ Empty state */}
        {!loading && !error && results.length === 0 && (
          <div className="text-muted" style={{ textAlign: "center", padding: 20 }}>
            No votes cast yet.
          </div>
        )}

        {/* ✅ Chart */}
        {!loading && !error && results.length > 0 && (
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={results} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="votes" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      </Card>
    </Layout>
  );
}
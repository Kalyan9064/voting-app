import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function ResultsPage(){
  const [results,setResults] = useState([]);
  useEffect(()=>{ fetch("http://localhost:3000/candidate/vote/count").then(r=>r.json()).then(setResults).catch(console.error); }, []);

  return (
    <Layout>
      <Card title="🗳️ Election Results (Chart)">
        {results.length === 0 ? <div className="muted">No votes yet.</div> :
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={results} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="votes" fill="var(--primary)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        }
      </Card>
    </Layout>
  );
}

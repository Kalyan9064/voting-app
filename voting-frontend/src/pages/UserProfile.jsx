import React, { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Profile(){
  const [user,setUser] = useState(null);
  useEffect(()=>{ API.get("/user/profile").then(res=>setUser(res.data.user)).catch(console.error); }, []);
  if(!user) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <Card title="👤 My Profile">
        <div style={{ display:"grid", gap:8 }}>
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Age:</strong> {user.age}</div>
          <div><strong>Email:</strong> {user.email || "N/A"}</div>
          <div><strong>Mobile:</strong> {user.mobile || "N/A"}</div>
          <div><strong>Address:</strong> {user.address}</div>
          <div><strong>Aadhar:</strong> {user.aadharCardNumber}</div>
          <div className="row" style={{ marginTop: 12 }}>
            <Button onClick={()=>window.location.href="/update-password"}>🔒 Update Password</Button>
            <Button onClick={()=>window.location.href="/voter-dashboard"}>⬅️ Back</Button>
          </div>
        </div>
      </Card>
    </Layout>
  );
}

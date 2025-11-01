import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharCardNumber: "",
    password: "",
    role: "voter", // default
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/user/signup", form);
      // Option A: auto-redirect to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "auto", padding: 24 }}>
      <h2>📝 Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Full name" required onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" required onChange={handleChange} />
        <input name="email" placeholder="Email (optional)" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile (optional)" onChange={handleChange} />
        <input name="address" placeholder="Address" required onChange={handleChange} />
        <input name="aadharCardNumber" placeholder="Aadhar number" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <button type="submit" style={{ padding: "8px 12px" }}>Signup</button>
          <button type="button" onClick={() => navigate("/login")} style={{ padding: "8px 12px" }}>Go to Login</button>
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}

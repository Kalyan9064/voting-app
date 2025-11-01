import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [aadharCardNumber, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/user/login", {
        aadharCardNumber,
        password,
      });

      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Redirect to appropriate dashboard
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/voter-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 24 }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <label>Aadhar Number</label>
        <input
          name="aadharCardNumber"
          value={aadharCardNumber}
          onChange={(e) => setAadhar(e.target.value)}
          required
          placeholder="Enter your Aadhar number"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        <button type="submit" style={{ padding: "8px 12px" }}>
          Login
        </button>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <p style={{ marginTop: 6 }}>
          Don't have account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

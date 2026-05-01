import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Login() {
  const [aadharCardNumber, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAadhar("");
    setPassword("");
    setError("");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", { aadharCardNumber, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/voter-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Layout>
      <Card title="🔐 Login" subtitle="Use your Aadhar number and password">
        <form className="form" onSubmit={submit} autoComplete="off">

          {/* Aadhaar Input */}
          <input
            className="input"
            placeholder="Aadhar number"
            value={aadharCardNumber}
            onChange={(e) => setAadhar(e.target.value)}
            autoComplete="off"
            required
          />

          {/* Password Input with Eye Icon */}
          <div style={{ position: "relative" }}>
            <input
              className="input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            {/* Eye Icon Toggle */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                userSelect: "none",
                color: "#444",
              }}
            >
              {showPassword ? "⌣" : "👁"}
            </span>
          </div>

          <Button variant="primary" type="submit">Login</Button>

          {error && (
            <div style={{ color: "red", marginTop: "8px" }}>{error}</div>
          )}

          <div className="text-muted" style={{ marginTop: "10px" }}>
            Don't have an account? <a href="/signup">Signup</a>
          </div>

        </form>
      </Card>
    </Layout>
  );
}

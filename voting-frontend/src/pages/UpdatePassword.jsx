import { useState } from "react";
import API from "../api/api";  // ✅ Fixed: using shared API instance
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Fixed: using API instance instead of raw fetch + hardcoded URL
      const res = await API.put("/user/profile/password", {
        currentPassword,
        newPassword,
      });

      setIsError(false);
      setMsg(res.data.message || "Password updated successfully");
    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Layout>
      <Card title="🔒 Update Password">

        {msg && (
          <div style={{
            marginBottom: 12,
            padding: "10px 14px",
            borderRadius: 8,
            background: isError ? "#ffe6e6" : "#e5ffe6",
            color: isError ? "#b30000" : "#0a7a00",
            fontWeight: 600,
            textAlign: "center"
          }}>
            {msg}
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="input"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="input"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Button variant="primary" type="submit">
            Update Password
          </Button>

          <Button onClick={() => window.location.href = "/profile"}>
            ⬅️ Back
          </Button>
        </form>

      </Card>
    </Layout>
  );
}
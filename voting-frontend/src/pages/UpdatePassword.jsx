import { useState } from "react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/user/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Password</h2>

      {msg && (
        <p className="mb-3 text-center text-blue-600 font-semibold">
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Current Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

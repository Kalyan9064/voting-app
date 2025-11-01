import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: "", party: "", age: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch candidates
  const loadCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/candidate");
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // Add or Update Candidate
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/candidate/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Candidate Updated");
      } else {
        await axios.post(
          "http://localhost:3000/candidate",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Candidate Added");
      }

      setForm({ name: "", party: "", age: "" });
      setEditId(null);
      loadCandidates();
    } catch (err) {
      alert("Error saving candidate");
      console.log(err);
    }
  };

  const deleteCandidate = async (id) => {
    if (!confirm("Delete this candidate?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/candidate/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Candidate Deleted");
      loadCandidates();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (candidate) => {
    setEditId(candidate._id);
    setForm({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* ADD / UPDATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">
          {editId ? "Update Candidate" : "Add Candidate"}
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Party"
            className="border p-2 rounded w-full"
            value={form.party}
            onChange={(e) => setForm({ ...form, party: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded w-full"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Candidate" : "Add Candidate"}
        </button>
      </form>

      {/* SHOW ALL CANDIDATES */}
      <h2 className="text-2xl font-semibold mb-3">All Candidates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow p-4 rounded border"
          >
            <h3 className="font-bold text-lg">{c.name}</h3>
            <p>Party: {c.party}</p>
            <p>Age: {c.age}</p>
            <p className="font-semibold">Votes: {c.voteCount}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => startEdit(c)}
                className="bg-yellow-500 px-3 py-1 rounded text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCandidate(c._id)}
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;

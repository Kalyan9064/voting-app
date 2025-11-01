import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Signup(){
  const [form,setForm] = useState({ name:"", age:"", email:"", mobile:"", address:"", aadharCardNumber:"", password:"" });
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handle = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Layout>
      <Card title="📝 Signup" subtitle="Register as a voter">
        <form className="form" onSubmit={submit}>
          <input name="name" className="input" placeholder="Full name" onChange={handle} required />
          <input name="age" className="input" placeholder="Age" type="number" onChange={handle} required />
          <input name="email" className="input" placeholder="Email (optional)" onChange={handle} />
          <input name="mobile" className="input" placeholder="Mobile (optional)" onChange={handle} />
          <input name="address" className="input" placeholder="Address" onChange={handle} required />
          <input name="aadharCardNumber" className="input" placeholder="Aadhar number" onChange={handle} required />
          <input name="password" className="input" placeholder="Password" type="password" onChange={handle} required />
          <Button variant="primary" type="submit">Signup</Button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </Card>
    </Layout>
  );
}

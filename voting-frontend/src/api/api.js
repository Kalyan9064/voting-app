import axios from "axios";

const API = axios.create({
  baseURL: "https://voting-app-bimw.onrender.com", // ✅ hardcoded for now
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
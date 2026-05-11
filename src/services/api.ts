import axios from "axios";

const API = axios.create({
  baseURL: "https://zeel-fashion-backend-d53hzz1d7-aks-projects-cb525b83.vercel.app//api",
});

// Attach JWT token
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;
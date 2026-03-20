import axios from "axios";

const getBaseURL = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:5000/api";
  }
  
  return "https://louder-ai-server.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

console.log(`API Base URL: ${api.defaults.baseURL}`);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
import axios from "axios";

const isProduction = import.meta.env.PROD;
const baseUrl = isProduction ? "/api" : "http://localhost:5000/api";
const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;

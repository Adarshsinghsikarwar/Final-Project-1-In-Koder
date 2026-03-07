// API Service
// Install axios: pnpm add axios

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
// });

// // Attach JWT token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

const api = {
  get: (url) => Promise.resolve({ data: {} }),
  post: (url, data) => Promise.resolve({ data: {} }),
  put: (url, data) => Promise.resolve({ data: {} }),
  delete: (url) => Promise.resolve({ data: {} }),
};

export default api;

import axios from "axios";

const API_BASE_URL =
  // process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  process.env.NEXT_PUBLIC_API_URL ||
  "https://magville-hotel-backend.onrender.com/api/v1";

export const adminAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

adminAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle 401 & Expired Sessions
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");

        // Do not redirect if already on any /auth page
        const isAuthPage = window.location.pathname.startsWith("/auth");

        if (!isAuthPage) {
          window.location.href = "/auth/login"; // Absolute path
        }
      }
    }
    return Promise.reject(error);
  },
);

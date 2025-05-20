import axios from "axios";

const BASE_URL = process.env.VITE_SERVER_BASE_URL || 'http://localhost:3000';
const ADMIN_URL = `${BASE_URL}/admin`;

const authInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

const adminAuthInterceptor = (req) => {
  const accessToken = JSON.parse(localStorage.getItem("admin"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({
  baseURL: BASE_URL,
});

export const ADMIN_API = axios.create({
  baseURL: ADMIN_URL,
});


API.interceptors.request.use(authInterceptor);
ADMIN_API.interceptors.request.use(adminAuthInterceptor);

export const handleApiError = (error) => {
  return { error: error.message, data: null };
};

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCurrentUser = async (token) => {
  const response = await api.get("/auth/me",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerWorkPoints = async (token) => {
  console.log(new Date().toISOString())
  const response = await api.post("/points",{timestamp: new Date().toISOString(),},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchWorkPoints = async () => {
  const response = await api.get("/points/me");
  return response.data;
};

export default api;
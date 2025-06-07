import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

// Add auth header interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (email, password) => api.post("/login", { email, password });
export const register = (email, password) => api.post("/register", { email, password });
export const getPosts = () => api.get("/posts");
export const addPost = (content) => api.post("/posts", { content });
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const updatePost = (id, content) => api.put(`/posts/${id}`, { content });

export default api;

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
export const register = (email, password, password_confirmation) => api.post("/register", { email, password, password_confirmation });
export const getPosts = () => api.get("/posts");
export const addPost = (title, content) => api.post("/posts", {title, content });
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const updatePost = (id, title, content) => api.put(`/posts/${id}`, { id, title, content });

export default api;
 
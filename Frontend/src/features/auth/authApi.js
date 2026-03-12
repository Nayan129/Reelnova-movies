import api from "../../api/axios";

export const registerUser = (data) => api.post("/api/auth/register", data);

export const loginUser = (data) => api.post("/api/auth/login", data);

export const getMe = () => api.get("/api/auth/get-me");

export const logoutUser = () => api.post("/api/auth/logout");

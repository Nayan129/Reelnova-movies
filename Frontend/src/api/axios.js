import axios from "axios";

const api = axios.create({
  baseURL: "https://reelnova-movie-app.onrender.com",
  withCredentials: true,
  timeout:10000,
});

export default api;

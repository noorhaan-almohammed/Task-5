import axios from "axios";

const api = axios.create({
  baseURL: "https://web-production-3ca4c.up.railway.app/api",
});

export default api;

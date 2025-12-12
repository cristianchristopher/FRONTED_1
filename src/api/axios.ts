import axios from "axios";

const api = axios.create({
    baseURL: "https://back-web-administrador.onrender.com",
});



api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
});

export default api;


/*
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
*/
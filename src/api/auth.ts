import api from "./axios";

export const loginRequest = (correo: string, contrasena: string) =>{
    return api.post("/api/v1/auth/login", {correo,contrasena});
};
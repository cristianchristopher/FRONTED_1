import api from "./axios";

export const listarPersonales = () => {
 return api.get("/api/v1/personal");
};
export const insertarPersonal = (data: any) => {
  return api.post("/", data);
};

export const actualizarPersonal = (data: any) => {
  return api.put("/", data);
};

export const activarPersonal = (data: any) => {
  return api.put("/", data);
};

export const eliminarPersonal = (data: any) => {
  return api.delete("/", { data });
};

export const obtenerPorId = () => {
  return api.get("/");
};
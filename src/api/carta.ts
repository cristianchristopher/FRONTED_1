import api from "./axios";

// ✅ Crear (multipart/form-data)
export const crearCartaRequest = (formData: FormData) => {
  return api.post("/api/v1/cartas", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Listar
export const listarCartasRequest = () => {
  return api.get("/api/v1/cartas");
};

// ✅ Actualizar (multipart/form-data: puede traer o no imagen)
export const actualizarCartaRequest = (idCarta: number, formData: FormData) => {
  return api.put(`/api/v1/cartas/${idCarta}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Eliminar (soft delete)
export const eliminarCartaRequest = (idCarta: number) => {
  return api.delete(`/api/v1/cartas/${idCarta}`);
};
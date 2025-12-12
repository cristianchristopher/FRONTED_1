import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  crearCartaRequest,
  listarCartasRequest,
  actualizarCartaRequest,
  eliminarCartaRequest,
} from "../api/carta";

type CartaItem = {
  idCarta: number;
  descripcion: string;
  stock: number;
  fechaCreacion: string;
  imagenUrl: string;
};

export default function ImageUploadPage() {
  // -------- Crear ----------
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // -------- Listado ----------
  const [items, setItems] = useState<CartaItem[]>([]);
  const [loading, setLoading] = useState(false);

  // -------- Editar ----------
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editStock, setEditStock] = useState(0);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState("");

  const backendBase = useMemo(() => {
    return import.meta.env.DEV
      ? "http://localhost:4000"
      : "https://back-web-administrador.onrender.com";
  }, []);

  const cargar = async () => {
    const res = await listarCartasRequest();
    setItems(res.data.data ?? []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const submitCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Selecciona una imagen");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("descripcion", descripcion);
      formData.append("stock", String(stock));
      formData.append("imagen", file);

      await crearCartaRequest(formData);

      setDescripcion("");
      setStock(0);
      setFile(null);
      setPreview("");

      await cargar();
      alert("Guardado ✅");
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const abrirEditar = (item: CartaItem) => {
    setEditId(item.idCarta);
    setEditDescripcion(item.descripcion);
    setEditStock(item.stock);
    setEditFile(null);
    setEditPreview("");
    setOpenEdit(true);
  };

  const onEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setEditFile(f);
    setEditPreview(f ? URL.createObjectURL(f) : "");
  };

  const guardarEdicion = async () => {
    if (!editId) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("descripcion", editDescripcion);
      formData.append("stock", String(editStock));

      if (editFile) formData.append("imagen", editFile);

      await actualizarCartaRequest(editId, formData);

      setOpenEdit(false);
      await cargar();
      alert("Actualizado ✅");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (idCarta: number) => {
    const ok = confirm("¿Seguro que deseas eliminar? (estado=false)");
    if (!ok) return;

    setLoading(true);
    try {
      await eliminarCartaRequest(idCarta);
      await cargar();
      alert("Eliminado ✅");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Subir Imagen (Guardada en PostgreSQL BYTEA)
      </Typography>

      {/* FORM CREAR */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={submitCrear} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              fullWidth
            />

            <Button variant="contained" component="label">
              Seleccionar imagen
              <input hidden type="file" accept="image/*" onChange={onFileChange} />
            </Button>

            {preview && (
              <Box>
                <Typography variant="subtitle2">Vista previa:</Typography>
                <Box
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{ mt: 1, width: 260, maxWidth: "100%", borderRadius: 2 }}
                />
              </Box>
            )}

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 2 }} />

      {/* LISTADO RESPONSIVE SIN GRID */}
      <Typography variant="h6" gutterBottom>
        Cartas subidas
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {items.map((c) => (
          <Card
            key={c.idCarta}
            sx={{
              flex: "1 1 320px",   // ✅ se adapta (mín 320px, luego se acomodan)
              minWidth: 280,
              maxWidth: 420,
            }}
          >
            <CardContent>
              <Typography fontWeight="bold">{c.descripcion}</Typography>
              <Typography variant="body2">Stock: {c.stock}</Typography>

              <Box
                component="img"
                src={`${backendBase}${c.imagenUrl}`}
                alt="carta"
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  mt: 1.5,
                  borderRadius: 2,
                }}
              />

              <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                <Button variant="outlined" onClick={() => abrirEditar(c)}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => eliminar(c.idCarta)}>
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* MODAL EDITAR */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar Carta</DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Descripción"
              value={editDescripcion}
              onChange={(e) => setEditDescripcion(e.target.value)}
              fullWidth
            />

            <TextField
              label="Stock"
              type="number"
              value={editStock}
              onChange={(e) => setEditStock(Number(e.target.value))}
              fullWidth
            />

            <Button variant="contained" component="label">
              Reemplazar imagen (opcional)
              <input hidden type="file" accept="image/*" onChange={onEditFileChange} />
            </Button>

            {editPreview && (
              <Box>
                <Typography variant="subtitle2">Vista previa nueva:</Typography>
                <Box
                  component="img"
                  src={editPreview}
                  alt="edit-preview"
                  sx={{ mt: 1, width: 260, maxWidth: "100%", borderRadius: 2 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarEdicion} disabled={loading}>
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
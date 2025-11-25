import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import api from "../api/axios";

export default function DashboardHomePage() {
  const [stats, setStats] = useState({
    personal: 0,
    clientes: 0,
    imagenes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const personalRes = await api.get("/api/v1/personal");

        const clientesRes = { data: { data: [] } };
        const imagenesRes = { data: { data: [] } };

        setStats({
          personal: personalRes.data.data.length,
          clientes: clientesRes.data.data.length,
          imagenes: imagenesRes.data.data.length,
        });
      } catch (err) {
        console.error("Error obteniendo estadísticas:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Panel de Administración
      </Typography>

      {/* CONTENEDOR SIN GRID */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* CARD PERSONAL */}
        <Card style={{ backgroundColor: "#1976d2", color: "white", width: "300px" }}>
          <CardContent>
            <Typography variant="h5">Personal</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              {stats.personal}
            </Typography>
          </CardContent>
        </Card>

        {/* CARD CLIENTES */}
        <Card style={{ backgroundColor: "#2e7d32", color: "white", width: "300px" }}>
          <CardContent>
            <Typography variant="h5">Clientes</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              {stats.clientes}
            </Typography>
          </CardContent>
        </Card>

        {/* CARD IMÁGENES */}
        <Card style={{ backgroundColor: "#ed6c02", color: "white", width: "300px" }}>
          <CardContent>
            <Typography variant="h5">Imágenes</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              {stats.imagenes}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

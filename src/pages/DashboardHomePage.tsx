import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
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

        // Estos endpoints aún no existen — evita error
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
    <div>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Panel de Administración
      </Typography>

      <Grid container spacing={3}>

        {/* CARD PERSONAL */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#1976d2", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Personal</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.personal}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD CLIENTES */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#2e7d32", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Clientes</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.clientes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD IMÁGENES */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#ed6c02", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Imágenes</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.imagenes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}
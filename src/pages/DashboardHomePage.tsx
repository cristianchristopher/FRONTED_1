import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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

        setStats({
          personal: personalRes.data.data.length,
          clientes: 0,   // aún no creados
          imagenes: 0,   // aún no creados
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
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Personal</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.personal}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#2e7d32", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Clientes</Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.clientes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#ed6c02", color: "white" }}>
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
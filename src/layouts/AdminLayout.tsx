import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header */}
      <Header open={open} setOpen={setOpen} />

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: "margin-left 0.3s ease",
          marginLeft: open ? "250px" : "70px", // espacio del sidebar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
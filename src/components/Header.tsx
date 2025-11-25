import { AppBar, Toolbar, IconButton, Typography, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ open, setOpen }: any) {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>

        {/* ABRIR / CERRAR SIDEBAR */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setOpen(!open)}   // ⭐ importante para móviles
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* TÍTULO */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Panel de Administración
        </Typography>

        {/* BOTÓN CERRAR SESIÓN */}
        <Box>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderColor: "white", color: "white" }}
          >
            Cerrar Sesión
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
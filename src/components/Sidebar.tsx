import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import EmailIcon from "@mui/icons-material/Email";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Sidebar({ open, setOpen }: any) {
  const theme = useTheme();

  // Detecta pantallas pequeñas (tablet / móvil)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"} // Cambia según tamaño
      anchor="left"
      open={open}
      onClose={() => setOpen(false)} // Cerrar cuando se hace clic fuera (móvil)
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          marginTop: isMobile ? "64px" : "64px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      <List>

        <ListItemButton component={Link} to="/dashboard" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard/personal" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Personal" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard/personal/create" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Agregar Personal" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard/customers" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText primary="Usuarios Gmail" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard/images" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><ImageIcon /></ListItemIcon>
          <ListItemText primary="Subir Imágenes" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}
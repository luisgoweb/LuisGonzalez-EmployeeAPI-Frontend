import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedRoute = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", sm: 240 },
          flexShrink: { sm: 0 },
        }}
      >
        <Sidebar />
      </Box>

      {/* Contenido principal (Outlet) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
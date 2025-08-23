import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const drawerWidth = 240;


const ProtectedRoute = () => {
 const [mobileOpen, setMobileOpen] = useState(false);


 const handleDrawerToggle = () => {
   setMobileOpen(!mobileOpen);
 };


 return (
   <Grid container >
     {/* Icono de menú para móviles */}
     <Grid
       sx={{
         display: { sm: "none" },
         position: "fixed",
         top: 0,
         left: 0,
         zIndex: 1200, 
       }}
     >
       <IconButton
         color="inherit"
         aria-label="open drawer"
         edge="start"
         onClick={handleDrawerToggle}
         sx={{
           display: { sm: "none" },
           m: 1,
           color: "#0D314C",
           backgroundColor: "#F9FBFD",
           "&:hover": {
             backgroundColor: "#D8E2E8",
           },
         }}
       >
         <MenuIcon />
       </IconButton>
     </Grid>


     {/* Sidebar fijo para desktop */}
     <Grid
       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
     >
       <Drawer
         variant="temporary"
         open={mobileOpen}
         onClose={handleDrawerToggle}
         ModalProps={{ keepMounted: true }}
         sx={{
           display: { xs: "block", sm: "none" },
           "& .MuiDrawer-paper": {
             boxSizing: "border-box",
             width: drawerWidth,
           },
         }}
       >
         <Sidebar />
       </Drawer>
       <Drawer
         variant="permanent"
         sx={{
           display: { xs: "none", sm: "block" },
           "& .MuiDrawer-paper": {
             boxSizing: "border-box",
             width: drawerWidth,
           },
         }}
         open
       >
         <Sidebar />
       </Drawer>
     </Grid>


     {/* Contenido principal (Outlet) */}
     <Grid
       component="main"
       sx={{
         flexGrow: 1,
         p: 3,
         width: { sm: `calc(100% - ${drawerWidth}px)` },
         mt: { xs: 6, sm: 0 }, 
       }}
     >
       <Outlet />
     </Grid>
   </Grid>
 );
};


export default ProtectedRoute;

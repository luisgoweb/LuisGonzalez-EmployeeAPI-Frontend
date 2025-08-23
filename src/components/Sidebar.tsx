
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router-dom";
const primaryColor = "#1D9A94";
const secondaryColor = "#0D314C";


const Sidebar = () => {
 return (
   <Grid
     sx={{
       maxWidth: 240,
       height: "100%",
       bgcolor: secondaryColor,
       color: "#fff",
       p: 2,
     }}
   >
     <List>
       <ListItem disablePadding sx={{ mb: 2 }}>
         <ListItemButton component={NavLink} to="/employees">
           <ListItemIcon>
             <DashboardIcon sx={{ color: primaryColor }} />
           </ListItemIcon>
           <ListItemText primary="Dashboard" />
         </ListItemButton>
       </ListItem>
      
       <Divider sx={{ bgcolor: primaryColor, my: 2 }} />


       {/* Links de Navegación */}
       <ListItem disablePadding>
         <ListItemButton component={NavLink} to="/employees">
           <ListItemIcon>
             <PeopleIcon sx={{ color: "#fff" }} />
           </ListItemIcon>
           <ListItemText primary="Empleados" />
         </ListItemButton>
       </ListItem>
       <ListItem disablePadding>
         <ListItemButton component={NavLink} to="/add-employee">
           <ListItemIcon>
             <PersonAddIcon sx={{ color: "#fff" }} />
           </ListItemIcon>
           <ListItemText primary="Añadir Empleados" />
         </ListItemButton>
       </ListItem>
     </List>
   </Grid>
 );
};


export default Sidebar;

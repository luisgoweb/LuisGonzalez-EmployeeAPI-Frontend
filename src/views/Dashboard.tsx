import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";


interface Employee {
 name: string;
 email: string;
 department: string;
 position: string;
}


const employees: Employee[] = [
 {
   name: "Juan Perez",
   email: "juan.perez@example.com",
   department: "IT",
   position: "Software Developer",
 },
 {
   name: "Maria Lopez",
   email: "maria.lopez@example.com",
   department: "Recursos Humanos",
   position: "Especialista en RRHH",
 },
 {
   name: "Carlos Sanchez",
   email: "carlos.sanchez@example.com",
   department: "Marketing",
   position: "Gerente de Marketing",
 },
];


const Dashboard = () => {
 const handleEdit = (employeeName: string) => {
   console.log("Editando a:", employeeName);
 };


 const handleDelete = (employeeName: string) => {
   console.log("Eliminando a:", employeeName);
 };


 return (
   <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
     {/* Encabezado con "Hola, admin" */}
     <Box
       sx={{
         display: "flex",
         justifyContent: "flex-end",
         alignItems: "center",
         mb: 4,
       }}
     >
       <Typography
         variant="body1"
         sx={{ color: "#0D314C", fontWeight: "bold" }}
       >
         Hola, admin
       </Typography>
     </Box>


     {/* Lista de Empleados en formato de tabla */}
     <Typography variant="h5" sx={{ mb: 2, color: "#0D314C" }}>
       Lista de Empleados
     </Typography>
     <TableContainer component={Paper}>
       <Table aria-label="employee table">
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
               Email
             </TableCell>
             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
               Departamento
             </TableCell>
             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
               Posición
             </TableCell>
             <TableCell align="right">Acciones</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {employees.map((employee, index) => (
             <TableRow key={index}>
               <TableCell>{employee.name}</TableCell>
               <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                 {employee.email}
               </TableCell>
               <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                 {employee.department}
               </TableCell>
               <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                 {employee.position}
               </TableCell>
               <TableCell align="right">
                 <IconButton
                   color="primary"
                   onClick={() => handleEdit(employee.name)}
                 >
                   <EditIcon />
                 </IconButton>
                 <IconButton
                   color="secondary"
                   onClick={() => handleDelete(employee.name)}
                 >
                   <DeleteIcon />
                 </IconButton>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
   </Box>
 );
};


export default Dashboard;


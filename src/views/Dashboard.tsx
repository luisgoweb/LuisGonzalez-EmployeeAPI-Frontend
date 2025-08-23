import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
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
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../services/employeeService";
import { useAuthStore } from "../store/authStore";
import { useEmployeeStore } from "../store/employeeStore";
import { type Employee } from "../types";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuthStore();
  const { employees, setEmployees, removeEmployee } = useEmployeeStore();

  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "warning" } | null>(null);

  // Función para obtener los empleados
  const fetchEmployees = async () => {
    if (!token) return;
    try {
      const fetchedEmployees = await getEmployees(token);
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los empleados.';
      setAlert({ message: errorMessage, severity: 'warning' }); // Alerta de tipo warning
    }
  };

  // Cargar los empleados al montar el componente y controlar la desaparición de la alerta
  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); // La alerta desaparece después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleEdit = (employee: Employee) => {
    navigate('/add-employee', { state: { employee } });
  };

  const handleDelete = async (employeeId: string) => {
    if (!token) return;
    try {
      await deleteEmployee(token, employeeId);
      removeEmployee(employeeId);
      setAlert({ message: 'Empleado eliminado exitosamente.', severity: 'warning' }); // Alerta de tipo warning
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      const errorMessage = error instanceof Error ? error.message : 'Hubo un error al eliminar el empleado.';
      setAlert({ message: errorMessage, severity: 'warning' }); // Alerta de tipo warning
    }
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

      {/* Alerta */}
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      {/* Lista de Empleados en formato de tabla */}
      <Typography variant="h5" sx={{ mb: 2, color: "#0D314C" }}>
        Lista de Empleados
      </Typography>
      {employees.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          Aún no hay empleados. Usa el formulario para comenzar a añadir empleados.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Email</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Departamento</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Posición</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{employee.email}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{employee.department}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{employee.position}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(employee)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
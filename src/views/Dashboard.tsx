import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
  const { token, isAuthenticated, username } = useAuthStore();
  const { employees, setEmployees, removeEmployee } = useEmployeeStore();

  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "warning" } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(1);
  const employeesPerPage = 10;

  // Filtramos los empleados basados en el término de búsqueda
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * employeesPerPage,
    page * employeesPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchEmployees = async () => {
    if (!token) return;
    try {
      const fetchedEmployees = await getEmployees(token);
      setEmployees(fetchedEmployees);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los empleados.';
      setAlert({ message: errorMessage, severity: 'warning' });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
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
      setAlert({ message: 'Empleado eliminado exitosamente.', severity: 'warning' });
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      const errorMessage = error instanceof Error ? error.message : 'Hubo un error al eliminar el empleado.';
      setAlert({ message: errorMessage, severity: 'warning' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
      {/* Encabezado con el nombre de usuario dinámico */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#0D314C", fontWeight: "bold" }}
        >
          Lista de Empleados
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#0D314C", fontWeight: "bold" }}
        >
          Hola, {username || 'Admin'}
        </Typography>
      </Box>

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      {/* Campo de búsqueda */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar por nombre, posición o departamento"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

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
              {paginatedEmployees.map((employee) => (
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
      
      {/* Paginador */}
      {filteredEmployees.length > employeesPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
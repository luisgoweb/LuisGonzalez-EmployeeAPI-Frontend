import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import { employeeFormSchema } from "../schemas/employeeSchema";
import { createEmployee, updateEmployee } from "../services/employeeService";
import { useAuthStore } from "../store/authStore";
import { type Employee, type EmployeeFormType } from "../types";

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const employeeToEdit = location.state?.employee as Employee | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employeeToEdit,
  });

  const onSubmit: SubmitHandler<EmployeeFormType> = async (data) => {
    if (!token) return;

    try {
      if (employeeToEdit) {
        // Modo de edición
        await updateEmployee(token, employeeToEdit.id, data);
        alert('Empleado actualizado exitosamente.');
      } else {
        // Modo de creación
        await createEmployee(token, data);
        alert('Empleado creado exitosamente.');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
      alert('Hubo un error al guardar el empleado.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {employeeToEdit ? 'Actualizar Empleado' : 'Añadir Empleado'}
      </Typography>
      <Paper elevation={5} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre Completo"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo Electrónico"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Departamento"
            {...register('department')}
            error={!!errors.department}
            helperText={errors.department?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ID del Departamento"
            {...register('department_Id')}
            error={!!errors.department_Id}
            helperText={errors.department_Id?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Posición"
            {...register('position')}
            error={!!errors.position}
            helperText={errors.position?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ID de la Posición"
            {...register('position_Id')}
            error={!!errors.position_Id}
            helperText={errors.position_Id?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {employeeToEdit ? 'Actualizar' : 'Crear'} Empleado
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;

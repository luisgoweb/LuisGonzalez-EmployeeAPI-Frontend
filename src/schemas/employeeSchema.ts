import { z } from 'zod';

// Esquema para la respuesta de la API (con el ID)
export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  department_Id: z.string(),
  department: z.string(),
  position: z.string(),
  position_Id: z.string(),
});

// Esquema para los datos que se enviarán en el formulario (sin el ID)
export const employeeFormSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.'),
  email: z.string().email('Formato de email incorrecto.').min(1, 'El email es obligatorio.'),
  department_Id: z.string().min(1, 'El ID del departamento es obligatorio.'),
  department: z.string().min(1, 'El nombre del departamento es obligatorio.'),
  position: z.string().min(1, 'La posición es obligatoria.'),
  position_Id: z.string().min(1, 'El ID de la posición es obligatorio.'),
});

export const employeesArraySchema = z.array(employeeSchema);
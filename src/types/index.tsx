import { z } from 'zod';
import type { employeeFormSchema, employeesArraySchema, employeeSchema } from '../schemas/employeeSchema';
import { authResponseSchema, loginSchema } from '../schemas/loginSchema';

// Tipo inferido para los datos del formulario de login
export type LoginSchemaType = z.infer<typeof loginSchema>;

// Tipo inferido para la respuesta de la API
export type AuthResponse = z.infer<typeof authResponseSchema>;

// Nuevos tipos para empleados
export type Employees = z.infer<typeof employeesArraySchema>;

// Nuevos tipos para empleados
export type Employee = z.infer<typeof employeeSchema>;

export type EmployeeFormType = z.infer<typeof employeeFormSchema>; 
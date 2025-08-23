import { z } from 'zod';

// Esquema de validación para los datos del formulario de login
export const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
});
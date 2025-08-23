import { z } from 'zod';

// Esquema de validación para los datos del formulario de login
export const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
});

// Esquema de Zod para la respuesta de la API de login
export const authResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  token: z.string(),
  tokenExpiration: z.string(),
});
import { z } from 'zod';
import { loginSchema } from '../schemas/loginSchema';

// Tipo inferido para los datos del formulario de login
export type LoginSchemaType = z.infer<typeof loginSchema>;

// Esquema de Zod para la respuesta de la API de login
export const authResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  token: z.string(),
  tokenExpiration: z.string(),
});

// Tipo inferido para la respuesta de la API
export type AuthResponse = z.infer<typeof authResponseSchema>;
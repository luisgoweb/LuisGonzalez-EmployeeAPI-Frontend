// src/services/authService.ts
import axios from 'axios';
import { type AuthResponse, authResponseSchema, type LoginSchemaType } from '../types';

const API_URL = 'http://localhost:5146/api/auth/login';

/**
 * Servicio para manejar la autenticación del usuario.
 * @param credentials Datos del formulario de login (username, password).
 * @returns La respuesta de la API con el token.
 */
export const login = async (credentials: LoginSchemaType): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL, credentials);
    // Valida la respuesta de la API con el esquema de Zod
    const validatedData = authResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    // Si la validación falla o la petición falla, lanzamos el error
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión.');
    }
    throw new Error('Error inesperado. Intente de nuevo más tarde.');
  }
};
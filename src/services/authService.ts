import axios from 'axios';
import { authResponseSchema } from '../schemas/loginSchema';
import { type AuthResponse, type LoginSchemaType } from '../types';

const API_URL = 'http://localhost:5146/api/auth/login';


export const login = async (credentials: LoginSchemaType): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL, credentials);
    const validatedData = authResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión.');
    }
    throw new Error('Error inesperado. Intente de nuevo más tarde.');
  }
};
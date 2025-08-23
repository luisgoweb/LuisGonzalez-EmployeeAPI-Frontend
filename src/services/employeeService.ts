// src/services/employee.service.ts
import axios from 'axios';
import { employeesArraySchema } from '../schemas/employeeSchema';
import { type Employee } from '../types';

const API_URL = 'http://localhost:5146/api/employee';

/**
 * Obtiene la lista de empleados desde la API.
 * @param token Token de autenticación del usuario.
 * @returns Lista de empleados.
 */
export const getEmployees = async (token: string): Promise<Employee[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Validamos la respuesta con Zod antes de usarla
    const validatedData = employeesArraySchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al obtener empleados.');
    }
    throw new Error('Error inesperado.');
  }
};

/**
 * Elimina un empleado de la API.
 * @param token Token de autenticación del usuario.
 * @param employeeId ID del empleado a eliminar.
 */
export const deleteEmployee = async (token: string, employeeId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Error al eliminar el empleado.');
    }
    throw new Error('Error inesperado.');
  }
};
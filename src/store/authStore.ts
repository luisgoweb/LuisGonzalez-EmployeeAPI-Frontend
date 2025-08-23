import { create } from 'zustand';

// Función para obtener el token del localStorage al inicio
const getStoredToken = () => localStorage.getItem('authToken');

// Interfaz para el estado del store
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(), // true si hay token, false si no
  // Acciones
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    set({ token, isAuthenticated: true });
  },
  clearToken: () => {
    localStorage.removeItem('authToken');
    set({ token: null, isAuthenticated: false });
  },
}));
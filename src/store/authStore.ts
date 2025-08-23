// src/store/authStore.ts
import { create } from 'zustand';

// Función para obtener el token y el nombre de usuario del localStorage
const getStoredAuthData = () => {
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('authUsername');
  return { token, username };
};

// Interfaz para el estado del store
interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuthData: (token: string, username: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  ...getStoredAuthData(),
  isAuthenticated: !!getStoredAuthData().token,
  // Acciones
  setAuthData: (token, username) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUsername', username);
    set({ token, username, isAuthenticated: true });
  },
  clearToken: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
    set({ token: null, username: null, isAuthenticated: false });
  },
}));
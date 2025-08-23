import { create } from 'zustand';
import { type Employee } from '../types';

interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  removeEmployee: (employeeId: string) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
  removeEmployee: (employeeId) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== employeeId),
    })),
}));
import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  department_Id: z.string(),
  department: z.string(),
  position: z.string(),
  position_Id: z.string(),
});

export const employeesArraySchema = z.array(employeeSchema);
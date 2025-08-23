// src/components/Login.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

// Define el esquema de validación con Zod
const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
});

// Infiere el tipo del esquema para usarlo en el formulario
type LoginSchemaType = z.infer<typeof loginSchema>;

export const Login = () => {
  // Usa el hook useForm para manejar el formulario y la validación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema), // Conecta el esquema de Zod
  });

  // Manejador del envío del formulario (se ejecuta solo si es válido)
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log('Datos del formulario validados:', data);
    // Aquí iría tu lógica de login (petición a la API, etc.)
  };

  return (
    <Grid container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage:
          'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 80%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Paper elevation={5} sx={{ padding: 8, width: '400px' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de usuario"
            // Vincula el campo con React Hook Form
            {...register('username')}
            // Aplica el estilo de error de Material-UI y muestra el mensaje
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            // Vincula el campo con React Hook Form
            {...register('password')}
            // Aplica el estilo de error y muestra el mensaje
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
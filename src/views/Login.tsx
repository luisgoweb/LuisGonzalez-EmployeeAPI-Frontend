import { zodResolver } from '@hookform/resolvers/zod';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Importaciones de los nuevos archivos
import { loginSchema } from '../schemas/loginSchema';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { type LoginSchemaType } from '../types';

export const Login = () => {
  const navigate = useNavigate();
  // Obtiene la nueva función setAuthData del store
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await login(data);
      // Llama a la nueva función para guardar el token Y el nombre de usuario
      setAuthData(response.token, response.username); 
      // Redirigimos al dashboard
      navigate('/employees');
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error en el login. Por favor, revisa tus credenciales.');
    }
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
        <Typography sx={{fontSize: 20, fontWeight: 600, pb:3}} variant="h4" component="h4" gutterBottom align="center">
          Bienvenido al Sistema de Gestión de Empleados
        </Typography>
        <Typography sx={{fontSize: 14}} variant="h4" component="h4" gutterBottom align="center">
          Ingresa con tu usuario y contraseña de administrador
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de usuario"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            {...register('password')}
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
          <Box
            sx={{
              display: 'flex',          // 1. Usa Flexbox para alinear los hijos
              justifyContent: 'center',  // 2. Centra los botones horizontalmente
              gap: 2,                   // 3. Añade un espacio entre los botones
              mt: 2,                    // 4. Añade un margen superior para separarlo del formulario
            }}
          >
          <IconButton aria-label="facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="instagram">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="linkedin">
            <LinkedInIcon />
          </IconButton>
        </Box>
        </Box>
      </Paper>
    </Grid>
  );
};
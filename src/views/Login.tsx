// src/components/Login.tsx
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';

// Define el tipo para los datos del formulario
interface LoginData {
  username: string;
  password: string;
}

export const Login = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para enviar los datos a la API
    // Por ahora, solo se muestran en la consola
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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
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

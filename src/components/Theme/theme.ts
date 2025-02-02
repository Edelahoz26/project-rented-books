// src/components/Theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: 'white', // Color del texto
            '& fieldset': {
              borderColor: '#1976d2', // Color del borde inicial
            },
            '&:hover fieldset': {
              borderColor: 'white', // Color del borde al pasar el mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Color del borde cuando está enfocado
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white', // Color inicial del label
            '&.Mui-focused': {
              color: '#1976d2', // Color del label cuando está enfocado
            },
          },
        },
      },
    },
  },
});

export default theme;
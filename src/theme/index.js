// src/theme/index.js
import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      ...(mode === 'dark' && {
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#e0e0e0', secondary: '#bdbdbd' },
      }),
      ...(mode === 'light' && {
        background: { default: '#f8f8f8', paper: '#ffffff' },
        text: { primary: '#212121', secondary: '#757575' },
      }),
      grey: {
        100: mode === 'light' ? '#f5f5f5' : '#424242',
        800: mode === 'light' ? '#424242' : '#eeeeee',
      }
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h6: { fontSize: '1.25rem', '@media (min-width:600px)': { fontSize: '1.5rem' } },
    },
    components: {
        MuiAppBar: { styleOverrides: { root: { boxShadow: 'none', borderBottom: `1px solid ${mode === 'light' ? '#ddd' : '#333'}` } } },
        MuiSelect: { styleOverrides: { select: { '&:focus': { backgroundColor: 'transparent' } } } },
        MuiOutlinedInput: { styleOverrides: { notchedOutline: { borderColor: 'transparent' }, root: { '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' } } } }
    }
  });
// File: src/theme/customTheme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#8e44ad' },     // lavender
    secondary: { main: '#26a69a' },   // teal
    background: { default: '#f6f9fc' },
    text: { primary: '#333' },
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    h4: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
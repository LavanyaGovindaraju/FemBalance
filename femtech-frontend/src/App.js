// File: src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline, Container, Paper } from '@mui/material';
import FormSection from './components/FormSection';
import theme from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: '#ffffff',
            maxWidth: '700px',
            mx: 'auto',
            boxShadow: 3,
          }}
        >
          <FormSection />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

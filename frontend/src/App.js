// File: src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import FormSection from './components/FormSection';
import theme from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <FormSection />
      </Container>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SavedItemsProvider } from './context/SavedItemsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      dark: '#1d4ed8',
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
});

// Holds off rendering until the /api/me session check resolves,
// so the nav never flashes the wrong login state on refresh.
function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return null;

  return (
    <SavedItemsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </SavedItemsProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

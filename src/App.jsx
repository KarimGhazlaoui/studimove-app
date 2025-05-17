import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import du Layout existant
import Layout from './components/Layout';

// Import des pages existantes (utilisez les noms de fichiers correspondants à votre structure)
import Dashboard from './pages/Dashboard.tsx';
import Events from './pages/Events.tsx';
import Participants from './pages/Participants.tsx';
import Accommodations from './pages/Accommodations.tsx';
import Transports from './pages/Transports.tsx';
import Communications from './pages/Communications.tsx';
import Settings from './pages/Settings.tsx';

// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/transports" element={<Transports />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
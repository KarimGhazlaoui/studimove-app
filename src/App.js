import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';

// Import des composants réels
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
// Décommentez ces lignes au fur et à mesure que vous créez les composants
// import Participants from './pages/Participants';
// import Accommodations from './pages/Accommodations';
// import Transports from './pages/Transports';
// etc.

// Pages temporaires pour les sections non encore implémentées
const TempParticipants = () => <h2>Participants (à implémenter)</h2>;
const TempAccommodations = () => <h2>Hébergements (à implémenter)</h2>;
const TempTransports = () => <h2>Transports (à implémenter)</h2>;
const TempDocuments = () => <h2>Documents (à implémenter)</h2>;
const TempCommunications = () => <h2>Communications (à implémenter)</h2>;
const TempSettings = () => <h2>Paramètres (à implémenter)</h2>;

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
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
            <Route path="/participants" element={<TempParticipants />} />
            <Route path="/accommodations" element={<TempAccommodations />} />
            <Route path="/transports" element={<TempTransports />} />
            <Route path="/documents" element={<TempDocuments />} />
            <Route path="/communications" element={<TempCommunications />} />
            <Route path="/settings" element={<TempSettings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
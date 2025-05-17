import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';

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

const drawerWidth = 240;

function App() {
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'Événements', icon: <EventIcon />, path: '/events' },
    { text: 'Participants', icon: <GroupIcon />, path: '/participants' },
    { text: 'Hébergements', icon: <HotelIcon />, path: '/accommodations' },
    { text: 'Transports', icon: <DirectionsBusIcon />, path: '/transports' },
    { text: 'Documents', icon: <DescriptionIcon />, path: '/documents' },
    { text: 'Communications', icon: <MailIcon />, path: '/communications' },
    { text: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* Barre latérale */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                StudiMOVE
              </Typography>
            </Toolbar>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.text}
                  sx={{
                    my: 0.5,
                    mx: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          
          {/* Contenu principal */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Typography variant="h4" gutterBottom>
              Tableau de bord
            </Typography>
            <Typography paragraph>
              Bienvenue dans l'application StudiMOVE pour la gestion de voyages scolaires.
            </Typography>
            <Typography paragraph>
              Cette application vous permet de gérer les événements, participants, hébergements, 
              transports et communications pour vos voyages scolaires.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

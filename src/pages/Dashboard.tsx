import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  EventAvailable as EventIcon,
  Group as GroupIcon,
  Hotel as HotelIcon,
  DirectionsBus as BusIcon,
  SportsEsports as ActivityIcon
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Statistiques fictives pour le tableau de bord
  const stats = {
    totalEvents: 3,
    activeEvents: 1,
    totalParticipants: 250,
    totalAccommodations: 5,
    totalTransports: 8,
    totalActivities: 15
  };

  // Événements à venir (fictifs)
  const upcomingEvents = [
    {
      id: '1',
      name: 'SpainBreak Barcelone',
      startDate: '2023-06-15',
      location: 'Barcelone, Espagne',
      participantsCount: 120,
    },
    {
      id: '2',
      name: 'ItalyTrip Rome',
      startDate: '2023-07-01',
      location: 'Rome, Italie',
      participantsCount: 85,
    }
  ];

  // Dernières activités (fictives)
  const recentActivities = [
    {
      id: '1',
      description: 'Jean Dupont a été assigné à l\'hôtel Barceló Raval',
      timestamp: 'Il y a 2 heures'
    },
    {
      id: '2',
      description: 'Nouvel événement créé: PortugalTour Lisbonne',
      timestamp: 'Il y a 4 heures'
    },
    {
      id: '3',
      description: 'Marie Martin a été assignée au transport en bus',
      timestamp: 'Il y a 1 jour'
    },
    {
      id: '4',
      description: 'L\'activité "Visite de la Sagrada Familia" a été mise à jour',
      timestamp: 'Il y a 2 jours'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Tableau de bord
      </Typography>
      
      {/* Statistiques générales */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <EventIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">{stats.totalEvents}</Typography>
            <Typography variant="body2" color="textSecondary">Événements</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GroupIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">{stats.totalParticipants}</Typography>
            <Typography variant="body2" color="textSecondary">Participants</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HotelIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">{stats.totalAccommodations}</Typography>
            <Typography variant="body2" color="textSecondary">Hébergements</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BusIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">{stats.totalTransports}</Typography>
            <Typography variant="body2" color="textSecondary">Transports</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActivityIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">{stats.totalActivities}</Typography>
            <Typography variant="body2" color="textSecondary">Activités</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Événements à venir et dernières activités */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Événements à venir" />
            <CardContent>
              {upcomingEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Box>
                      <Typography variant="subtitle1">{event.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {event.location} | {event.startDate}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">
                        {event.participantsCount} participants
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(event.participantsCount / 150) * 100} 
                        sx={{ mt: 1, height: 8, borderRadius: 2 }}
                      />
                    </Box>
                  </Box>
                  {index < upcomingEvents.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Activités récentes" />
            <CardContent>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemText 
                        primary={activity.description}
                        secondary={activity.timestamp}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

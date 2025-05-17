import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Event } from '../types/event';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'SpainBreak Barcelone',
      description: 'Voyage étudiant à Barcelone avec activités culturelles et festives.',
      startDate: '2023-06-15',
      endDate: '2023-06-20',
      location: 'Barcelone, Espagne',
      status: 'scheduled',
      maxParticipants: 150,
      currentParticipants: 120,
      organizerId: '1'
    },
    {
      id: '2',
      name: 'ItalyTrip Rome',
      description: 'Découverte de Rome et ses monuments historiques.',
      startDate: '2023-07-01',
      endDate: '2023-07-06',
      location: 'Rome, Italie',
      status: 'draft',
      maxParticipants: 100,
      currentParticipants: 85,
      organizerId: '1'
    },
    {
      id: '3',
      name: 'PortugalTour Lisbonne',
      description: 'Visite culturelle de Lisbonne et ses environs.',
      startDate: '2023-08-10',
      endDate: '2023-08-15',
      location: 'Lisbonne, Portugal',
      status: 'draft',
      maxParticipants: 80,
      currentParticipants: 45,
      organizerId: '2'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'draft',
    maxParticipants: 0,
    currentParticipants: 0,
    organizerId: '1' // ID de l'organisateur actuel
  });

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        status: event.status,
        maxParticipants: event.maxParticipants,
        currentParticipants: event.currentParticipants,
        organizerId: event.organizerId
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        status: 'draft',
        maxParticipants: 0,
        currentParticipants: 0,
        organizerId: '1'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['maxParticipants', 'currentParticipants'].includes(name) ? parseInt(value) : value
    });
  };

  const handleSubmit = () => {
    if (currentEvent) {
      // Mise à jour d'un événement existant
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id 
          ? { 
              ...event, 
              ...formData 
            } 
          : event
      );
      setEvents(updatedEvents);
    } else {
      // Création d'un nouvel événement
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'scheduled':
        return 'Planifié';
      case 'active':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'scheduled':
        return 'info';
      case 'active':
        return 'success';
      case 'completed':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des Événements
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouvel Événement
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {event.startDate} - {event.endDate}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  {event.currentParticipants}/{event.maxParticipants}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(event.status)} 
                    color={getStatusColor(event.status) as any}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenDialog(event)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    // Redirection vers la page détaillée de l'événement (à implémenter)
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(event.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogue pour ajouter/modifier un événement */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentEvent ? 'Modifier l\'événement' : 'Ajouter un nouvel événement'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom de l'événement"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date de début"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date de fin"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lieu"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Statut"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="draft">Brouillon</MenuItem>
                <MenuItem value="scheduled">Planifié</MenuItem>
                <MenuItem value="active">En cours</MenuItem>
                <MenuItem value="completed">Terminé</MenuItem>
                <MenuItem value="cancelled">Annulé</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre max. de participants"
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Participants inscrits"
                name="currentParticipants"
                type="number"
                value={formData.currentParticipants}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0, max: formData.maxParticipants } }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
          >
            {currentEvent ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;

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
import { Activity } from '../types/activity';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      eventId: '1',
      name: 'Visite de la Sagrada Familia',
      description: 'Visite guidée de la célèbre cathédrale de Gaudí',
      startDateTime: '2023-06-16T10:00:00Z',
      endDateTime: '2023-06-16T12:00:00Z',
      location: 'Sagrada Familia, Barcelona',
      maxParticipants: 30,
      currentParticipants: 25,
      status: 'planned'
    },
    {
      id: '2',
      eventId: '1',
      name: 'Plage de Barceloneta',
      description: 'Après-midi détente à la plage',
      startDateTime: '2023-06-17T14:00:00Z',
      endDateTime: '2023-06-17T18:00:00Z',
      location: 'Plage de la Barceloneta, Barcelona',
      maxParticipants: 120,
      currentParticipants: 85,
      status: 'planned'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  
  const [formData, setFormData] = useState({
    eventId: '1',
    name: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    maxParticipants: 0,
    currentParticipants: 0,
    status: 'planned'
  });

  const handleOpenDialog = (activity?: Activity) => {
    if (activity) {
      setCurrentActivity(activity);
      setFormData({
        eventId: activity.eventId,
        name: activity.name,
        description: activity.description,
        startDateTime: activity.startDateTime.substring(0, 16),
        endDateTime: activity.endDateTime.substring(0, 16),
        location: activity.location,
        maxParticipants: activity.maxParticipants,
        currentParticipants: activity.currentParticipants,
        status: activity.status
      });
    } else {
      setCurrentActivity(null);
      setFormData({
        eventId: '1',
        name: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        maxParticipants: 0,
        currentParticipants: 0,
        status: 'planned'
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
    if (currentActivity) {
      // Mise à jour d'une activité existante
      const updatedActivities = activities.map(activity => 
        activity.id === currentActivity.id 
          ? { 
              ...activity, 
              ...formData 
            } 
          : activity
      );
      setActivities(updatedActivities);
    } else {
      // Création d'une nouvelle activité
      const newActivity: Activity = {
        id: Date.now().toString(),
        ...formData
      };
      setActivities([...activities, newActivity]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'primary';
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Planifiée';
      case 'ongoing':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des Activités
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouvelle Activité
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Horaires</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">{formatDateTime(activity.startDateTime)}</Typography>
                  <Typography variant="caption">→ {formatDateTime(activity.endDateTime)}</Typography>
                </TableCell>
                <TableCell>{activity.location}</TableCell>
                <TableCell>{activity.currentParticipants}/{activity.maxParticipants}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(activity.status)} 
                    color={getStatusColor(activity.status) as any}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenDialog(activity)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(activity.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogue pour ajouter/modifier une activité */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentActivity ? 'Modifier l\'activité' : 'Ajouter une nouvelle activité'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom de l'activité"
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
                label="Date et heure de début"
                name="startDateTime"
                type="datetime-local"
                value={formData.startDateTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date et heure de fin"
                name="endDateTime"
                type="datetime-local"
                value={formData.endDateTime}
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre maximum de participants"
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Statut"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="planned">Planifiée</MenuItem>
                <MenuItem value="ongoing">En cours</MenuItem>
                <MenuItem value="completed">Terminée</MenuItem>
                <MenuItem value="cancelled">Annulée</MenuItem>
              </TextField>
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
            {currentActivity ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Activities;

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
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  Avatar,
  AvatarGroup,
  Tooltip,
  Stack,
  LinearProgress,
  ListItemSecondaryAction
} from '@mui/material';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DirectionsBus as BusIcon,
  Flight as FlightIcon,
  Train as TrainIcon,
  DirectionsBoat as BoatIcon,
  More as MoreIcon,
  GroupAdd as GroupAddIcon,
  Schedule as ScheduleIcon,
  Place as PlaceIcon
} from '@mui/icons-material';
import { Transport, Passenger } from '../types/transport';

const Transports: React.FC = () => {
  // Données d'exemple
  const [transports, setTransports] = useState<Transport[]>([
    {
      id: '1',
      eventId: '1',
      name: 'Bus 1 - Paris-Barcelone',
      type: 'bus',
      provider: 'EuroLines',
      departureLocation: 'Paris, Gare Routière Internationale',
      arrivalLocation: 'Barcelona, Estació d\'Autobusos Nord',
      departureDateTime: '2023-07-01T07:00',
      arrivalDateTime: '2023-07-01T20:00',
      capacity: 50,
      notes: 'Bus avec wifi et prises électriques. Arrêt de 45min pour déjeuner.',
      contactPerson: 'Jean Martin',
      contactPhone: '+33 6 12 34 56 78',
      assignedPassengers: [
        { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78' },
        { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89' },
        // Plus de passagers...
      ]
    },
    {
      id: '2',
      eventId: '1',
      name: 'Vol AF1948 - Paris-Barcelone',
      type: 'plane',
      provider: 'Air France',
      departureLocation: 'Paris CDG Terminal 2F',
      arrivalLocation: 'Barcelona El Prat Terminal 1',
      departureDateTime: '2023-07-01T10:30',
      arrivalDateTime: '2023-07-01T12:15',
      capacity: 20,
      notes: 'Enregistrement 2h avant. Bagage en soute inclus.',
      contactPerson: 'Sophie Dubois',
      contactPhone: '+33 6 23 45 67 89',
      assignedPassengers: [
        { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 34 56 78 90' },
        { id: '4', name: 'Sophie Lefevre', email: 'sophie.lefevre@email.com', phone: '+33 6 45 67 89 01' },
        // Plus de passagers...
      ]
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTransport, setCurrentTransport] = useState<Transport | null>(null);
  const [assignPassengersOpen, setAssignPassengersOpen] = useState(false);
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'bus',
    provider: '',
    departureLocation: '',
    arrivalLocation: '',
    departureDateTime: '',
    arrivalDateTime: '',
    capacity: 0,
    notes: '',
    contactPerson: '',
    contactPhone: ''
  });

  // Liste de tous les participants (pour l'attribution)
  const [allPassengers] = useState<Passenger[]>([
    { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78' },
    { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89' },
    { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 34 56 78 90' },
    { id: '4', name: 'Sophie Lefevre', email: 'sophie.lefevre@email.com', phone: '+33 6 45 67 89 01' },
    { id: '5', name: 'Lucas Bernard', email: 'lucas.bernard@email.com', phone: '+33 6 56 78 90 12' },
    // Plus de participants...
  ]);

  // Passagers sélectionnés pour attribution
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);

  const handleOpenDialog = (transport?: Transport) => {
    if (transport) {
      setCurrentTransport(transport);
      setFormData({
        name: transport.name,
        type: transport.type,
        provider: transport.provider,
        departureLocation: transport.departureLocation,
        arrivalLocation: transport.arrivalLocation,
        departureDateTime: transport.departureDateTime,
        arrivalDateTime: transport.arrivalDateTime,
        capacity: transport.capacity,
        notes: transport.notes,
        contactPerson: transport.contactPerson,
        contactPhone: transport.contactPhone
      });
    } else {
      setCurrentTransport(null);
      setFormData({
        name: '',
        type: 'bus',
        provider: '',
        departureLocation: '',
        arrivalLocation: '',
        departureDateTime: '',
        arrivalDateTime: '',
        capacity: 0,
        notes: '',
        contactPerson: '',
        contactPhone: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const openParticipantsDialog = () => {
    setParticipantsDialogOpen(true);
  };
  
  const closeParticipantsDialog = () => {
    setParticipantsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' ? parseInt(value) : value
    });
  };

  const handleSubmit = () => {
    if (currentTransport) {
      // Mise à jour d'un transport existant
      const updatedTransports = transports.map(transport => 
        transport.id === currentTransport.id 
          ? { 
              ...transport, 
              ...formData 
            } 
          : transport
      );
      setTransports(updatedTransports);
    } else {
      // Création d'un nouveau transport
      const newTransport: Transport = {
        id: Date.now().toString(),
        eventId: '1', // ID de l'événement actuel
        ...formData,
        assignedPassengers: []
      };
      setTransports([...transports, newTransport]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setTransports(transports.filter(transport => transport.id !== id));
  };

  const handleOpenAssignPassengers = (transport: Transport) => {
    setCurrentTransport(transport);
    setSelectedPassengers(transport.assignedPassengers.map(p => p.id));
    setAssignPassengersOpen(true);
  };

  const handleCloseAssignPassengers = () => {
    setAssignPassengersOpen(false);
  };

  const handleTogglePassenger = (passengerId: string) => {
    if (selectedPassengers.includes(passengerId)) {
      setSelectedPassengers(selectedPassengers.filter(id => id !== passengerId));
    } else {
      setSelectedPassengers([...selectedPassengers, passengerId]);
    }
  };

  const handleSaveAssignedPassengers = () => {
    if (!currentTransport) return;

    const assignedPassengers = allPassengers.filter(p => selectedPassengers.includes(p.id));
    
    const updatedTransports = transports.map(transport => 
      transport.id === currentTransport.id 
        ? { 
            ...transport, 
            assignedPassengers 
          } 
        : transport
    );
    
    setTransports(updatedTransports);
    handleCloseAssignPassengers();
  };

  const getTransportTypeIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return <BusIcon />;
      case 'plane':
        return <FlightIcon />;
      case 'train':
        return <TrainIcon />;
      case 'boat':
        return <BoatIcon />;
      default:
        return <MoreIcon />;
    }
  };

  const getTransportTypeLabel = (type: string) => {
    switch (type) {
      case 'bus':
        return 'Bus';
      case 'plane':
        return 'Avion';
      case 'train':
        return 'Train';
      case 'boat':
        return 'Bateau';
      default:
        return 'Autre';
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
          Gestion des Transports
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouveau Transport
        </Button>
      </Box>

      <Grid container spacing={3}>
        {transports.map((transport) => (
          <Grid item xs={12} key={transport.id}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        {getTransportTypeIcon(transport.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{transport.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {transport.provider} • {getTransportTypeLabel(transport.type)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <PlaceIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="textSecondary">
                        {transport.departureLocation} → {transport.arrivalLocation}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="textSecondary">
                        {formatDateTime(transport.departureDateTime)} → {formatDateTime(transport.arrivalDateTime)}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <GroupAddIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="textSecondary">
                        {transport.assignedPassengers.length}/{transport.capacity} passagers assignés
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="body2" color="textSecondary">
                        {transport.notes}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <AvatarGroup max={4}>
                      {transport.assignedPassengers.map(p => (
                        <Avatar key={p.id} src={`https://i.pravatar.cc/300?u=${p.id}`} />
                      ))}
                    </AvatarGroup>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialogue pour ajouter/modifier un transport */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentTransport ? 'Modifier le transport' : 'Ajouter un nouveau transport'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Type de transport"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="train">Train</MenuItem>
                <MenuItem value="plane">Avion</MenuItem>
                <MenuItem value="other">Autre</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacité"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lieu de départ"
                name="departureLocation"
                value={formData.departureLocation}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date et heure de départ"
                name="departureDateTime"
                type="datetime-local"
                value={formData.departureDateTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lieu d'arrivée"
                name="arrivalLocation"
                value={formData.arrivalLocation}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date et heure d'arrivée"
                name="arrivalDateTime"
                type="datetime-local"
                value={formData.arrivalDateTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Personne de contact"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Téléphone de contact"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
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
            {currentTransport ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue pour ajouter des participants */}
      <Dialog open={participantsDialogOpen} onClose={closeParticipantsDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Ajouter des participants au transport {currentTransport?.type} 
          {currentTransport && ` (${currentTransport.departureLocation} → ${currentTransport.arrivalLocation})`}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Participants disponibles
          </Typography>
          <List>
            {allPassengers
              .filter(participant => 
                !currentTransport?.assignedPassengers.some(p => p.id === participant.id)
              )
              .map(participant => (
                <ListItem button key={participant.id} onClick={() => handleTogglePassenger(participant.id)}>
                  <ListItemText 
                    primary={participant.name} 
                    secondary={`${participant.email} | ${participant.phone}`} 
                  />
                </ListItem>
              ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Participants assignés
          </Typography>
          <List>
            {currentTransport?.assignedPassengers.map(participant => (
              <ListItem key={participant.id}>
                <ListItemText 
                  primary={participant.name} 
                  secondary={`${participant.email} | ${participant.phone}`} 
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    color="error"
                    onClick={() => handleTogglePassenger(participant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeParticipantsDialog}>Annuler</Button>
          <Button 
            onClick={handleSaveAssignedPassengers}
            variant="contained" 
            color="primary"
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transports;

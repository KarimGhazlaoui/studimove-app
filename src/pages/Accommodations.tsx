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
  Tooltip,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemAvatar,
  Checkbox,
  ListItemText,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PlaceIcon from '@mui/icons-material/Place';
import { Accommodation, Participant } from '../types/accommodation';

const Accommodations: React.FC = () => {
  // Données d'exemple
  const [accommodations, setAccommodations] = useState<Accommodation[]>([
    {
      id: '1',
      eventId: '1',
      name: 'Hôtel Barceló Raval',
      type: 'hotel',
      capacity: 80,
      address: 'Rambla del Raval, 17-21, 08001 Barcelona, Espagne',
      contactPerson: 'Maria Rodriguez',
      contactPhone: '+34 93 320 14 90',
      notes: 'Hôtel 4 étoiles avec piscine sur le toit. Petit-déjeuner inclus.',
      assignedParticipants: [
        { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78' },
        { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89' },
        // Plus de participants...
      ]
    },
    {
      id: '2',
      eventId: '1',
      name: 'Appart-Hôtel Aramunt',
      type: 'apartment',
      capacity: 40,
      address: 'Carrer de Muntaner, 60, 08011 Barcelona, Espagne',
      contactPerson: 'Carlos Gomez',
      contactPhone: '+34 93 452 56 70',
      notes: 'Appartements avec cuisine équipée. 2-4 personnes par appartement.',
      assignedParticipants: [
        { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 34 56 78 90' },
        { id: '4', name: 'Sophie Lefevre', email: 'sophie.lefevre@email.com', phone: '+33 6 45 67 89 01' },
        // Plus de participants...
      ]
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState<Accommodation | null>(null);
  const [assignParticipantsOpen, setAssignParticipantsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'hotel',
    capacity: 0,
    address: '',
    contactPerson: '',
    contactPhone: '',
    notes: ''
  });

  // Liste de tous les participants (pour l'attribution)
  const [allParticipants] = useState<Participant[]>([
    { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78' },
    { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89' },
    { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 34 56 78 90' },
    { id: '4', name: 'Sophie Lefevre', email: 'sophie.lefevre@email.com', phone: '+33 6 45 67 89 01' },
    { id: '5', name: 'Lucas Bernard', email: 'lucas.bernard@email.com', phone: '+33 6 56 78 90 12' },
    // Plus de participants...
  ]);

  // Participants sélectionnés pour attribution
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleOpenDialog = (accommodation?: Accommodation) => {
    if (accommodation) {
      setCurrentAccommodation(accommodation);
      setFormData({
        name: accommodation.name,
        type: accommodation.type,
        capacity: accommodation.capacity,
        address: accommodation.address,
        contactPerson: accommodation.contactPerson,
        contactPhone: accommodation.contactPhone,
        notes: accommodation.notes
      });
    } else {
      setCurrentAccommodation(null);
      setFormData({
        name: '',
        type: 'hotel',
        capacity: 0,
        address: '',
        contactPerson: '',
        contactPhone: '',
        notes: ''
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
      [name]: name === 'capacity' ? parseInt(value) : value
    });
  };

  const handleSubmit = () => {
    if (currentAccommodation) {
      // Mise à jour d'un hébergement existant
      const updatedAccommodations = accommodations.map(accommodation => 
        accommodation.id === currentAccommodation.id 
          ? { 
              ...accommodation, 
              ...formData 
            } 
          : accommodation
      );
      setAccommodations(updatedAccommodations);
    } else {
      // Création d'un nouvel hébergement
      const newAccommodation: Accommodation = {
        id: Date.now().toString(),
        eventId: '1', // ID de l'événement actuel
        ...formData,
        assignedParticipants: []
      };
      setAccommodations([...accommodations, newAccommodation]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setAccommodations(accommodations.filter(accommodation => accommodation.id !== id));
  };

  const handleOpenAssignParticipants = (accommodation: Accommodation) => {
    setCurrentAccommodation(accommodation);
    setSelectedParticipants(accommodation.assignedParticipants.map(p => p.id));
    setAssignParticipantsOpen(true);
  };

  const handleCloseAssignParticipants = () => {
    setAssignParticipantsOpen(false);
  };

  const handleToggleParticipant = (participantId: string) => {
    if (selectedParticipants.includes(participantId)) {
      setSelectedParticipants(selectedParticipants.filter(id => id !== participantId));
    } else {
      setSelectedParticipants([...selectedParticipants, participantId]);
    }
  };

  const handleSaveAssignedParticipants = () => {
    if (!currentAccommodation) return;

    const assignedParticipants = allParticipants.filter(p => selectedParticipants.includes(p.id));
    
    const updatedAccommodations = accommodations.map(accommodation => 
      accommodation.id === currentAccommodation.id 
        ? { 
            ...accommodation, 
            assignedParticipants 
          } 
        : accommodation
    );
    
    setAccommodations(updatedAccommodations);
    handleCloseAssignParticipants();
  };

  const getAccommodationTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel':
        return 'Hôtel';
      case 'apartment':
        return 'Appartement';
      case 'hostel':
        return 'Auberge';
      default:
        return 'Autre';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des Hébergements
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouvel Hébergement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {accommodations.map((accommodation) => (
          <Grid item xs={12} md={6} key={accommodation.id}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{accommodation.name}</Typography>
                  <Chip 
                    label={getAccommodationTypeLabel(accommodation.type)} 
                    color="primary" 
                    size="small"
                  />
                </Box>
                
                <Box display="flex" alignItems="center" mb={1}>
                  <PlaceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    {accommodation.address}
                  </Typography>
                </Box>
                
                <Typography variant="body2" mb={1}>
                  <strong>Contact:</strong> {accommodation.contactPerson} • {accommodation.contactPhone}
                </Typography>
                
                <Typography variant="body2" mb={2}>
                  <strong>Capacité:</strong> {accommodation.capacity} personnes
                </Typography>
                
                {accommodation.notes && (
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {accommodation.notes}
                  </Typography>
                )}
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Participants ({accommodation.assignedParticipants.length}/{accommodation.capacity})
                    </Typography>
                    <AvatarGroup max={5}>
                      {accommodation.assignedParticipants.map((participant) => (
                        <Tooltip key={participant.id} title={participant.name}>
                          <Avatar sx={{ width: 30, height: 30 }}>
                            {participant.name.charAt(0)}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                  <Box>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpenDialog(accommodation)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpenAssignParticipants(accommodation)}
                      size="small"
                    >
                      <GroupAddIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(accommodation.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialogue pour ajouter/modifier un hébergement */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentAccommodation ? 'Modifier l\'hébergement' : 'Ajouter un nouvel hébergement'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom de l'hébergement"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Type d'hébergement"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="hotel">Hôtel</MenuItem>
                <MenuItem value="apartment">Appartement</MenuItem>
                <MenuItem value="hostel">Auberge</MenuItem>
                <MenuItem value="other">Autre</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Téléphone de contact"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
              />
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
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
            disabled={!formData.name || !formData.address || formData.capacity <= 0}
          >
            {currentAccommodation ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue pour attribuer des participants */}
      <Dialog 
        open={assignParticipantsOpen} 
        onClose={handleCloseAssignParticipants} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Attribuer des participants
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            {currentAccommodation?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sélectionnez les participants à héberger ({selectedParticipants.length}/{currentAccommodation?.capacity})
          </Typography>
          
          <List sx={{ pt: 2 }}>
            {allParticipants.map((participant) => (
              <React.Fragment key={participant.id}>
                <ListItem button onClick={() => handleToggleParticipant(participant.id)}>
                  <ListItemAvatar>
                    <Checkbox 
                      checked={selectedParticipants.includes(participant.id)} 
                      onChange={() => handleToggleParticipant(participant.id)}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={participant.name} 
                    secondary={participant.email}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignParticipants}>Annuler</Button>
          <Button 
            onClick={handleSaveAssignedParticipants} 
            variant="contained" 
            color="primary"
            disabled={selectedParticipants.length > (currentAccommodation?.capacity || 0)}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Accommodations;

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
  Chip,
  Avatar,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Participant } from '../types/accommodation';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78' },
    { id: '2', name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89' },
    { id: '3', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 34 56 78 90' },
    { id: '4', name: 'Sophie Lefevre', email: 'sophie.lefevre@email.com', phone: '+33 6 45 67 89 01' },
    { id: '5', name: 'Lucas Bernard', email: 'lucas.bernard@email.com', phone: '+33 6 56 78 90 12' }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleOpenDialog = (participant?: Participant) => {
    if (participant) {
      setCurrentParticipant(participant);
      setFormData({
        name: participant.name,
        email: participant.email,
        phone: participant.phone,
      });
    } else {
      setCurrentParticipant(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
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
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (currentParticipant) {
      // Mise à jour d'un participant existant
      const updatedParticipants = participants.map(participant => 
        participant.id === currentParticipant.id 
          ? { 
              ...participant, 
              ...formData 
            } 
          : participant
      );
      setParticipants(updatedParticipants);
    } else {
      // Création d'un nouveau participant
      const newParticipant: Participant = {
        id: Date.now().toString(),
        ...formData
      };
      setParticipants([...participants, newParticipant]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    // Dans une application réelle, vérifier si le participant est associé à des hébergements/transports
    setParticipants(participants.filter(participant => participant.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrer les participants en fonction du terme de recherche
  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.phone.includes(searchTerm)
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Gestion des Participants
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nouveau Participant
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Rechercher un participant..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Participant</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParticipants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {participant.name.charAt(0)}
                    </Avatar>
                    {participant.name}
                  </Box>
                </TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.phone}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenDialog(participant)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(participant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogue pour ajouter/modifier un participant */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentParticipant ? 'Modifier le participant' : 'Ajouter un nouveau participant'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom complet"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={formData.phone}
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
            {currentParticipant ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Participants;
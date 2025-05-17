import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Business as CompanyIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Interface pour les utilisateurs
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Données fictives
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Nicolas Gagnon', email: 'nicolas@studimove.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Sophie Durand', email: 'sophie@studimove.com', role: 'manager', status: 'active' },
    { id: '3', name: 'Thomas Petit', email: 'thomas@studimove.com', role: 'user', status: 'active' }
  ]);
  
  const [companyInfo, setCompanyInfo] = useState({
    name: 'StudiMOVE',
    email: 'contact@studimove.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Avenue des Voyages, 75001 Paris',
    logo: 'logo.png'
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });

  // Paramètres fictifs de notification
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appNotifications: true,
    dailySummary: false,
    eventReminders: true,
    marketingMessages: false
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenUserDialog = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setUserForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: ''
      });
    } else {
      setCurrentUser(null);
      setUserForm({
        name: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: ''
      });
    }
    setUserDialogOpen(true);
  };

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
  };

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  const handleSubmitUser = () => {
    if (currentUser) {
      // Mise à jour d'un utilisateur existant
      const updatedUsers = users.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              name: userForm.name,
              email: userForm.email,
              role: userForm.role
            } 
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Création d'un nouvel utilisateur
      const newUser: User = {
        id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        status: 'active'
      };
      setUsers([...users, newUser]);
    }
    handleCloseUserDialog();
  };

  const handleUpdateCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une application réelle, appeler l'API pour mettre à jour les informations
    console.log('Informations de l\'entreprise mises à jour', companyInfo);
    // Afficher une notification de succès
  };

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value
    });
  };

  const handleToggleNotification = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked
    });
  };

  const handleDeleteUser = (userId: string) => {
    // Dans une application réelle, demander confirmation avant suppression
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleToggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: user.status === 'active' ? 'inactive' : 'active'
          } 
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Paramètres
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="settings tabs"
          variant="fullWidth"
        >
          <Tab icon={<PersonIcon />} label="Profil" />
          <Tab icon={<CompanyIcon />} label="Entreprise" />
          <Tab icon={<SecurityIcon />} label="Sécurité" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
        </Tabs>

        {/* Profil */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
              Informations personnelles
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  defaultValue="Nicolas Gagnon"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Adresse email"
                  defaultValue="nicolas@studimove.com"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  defaultValue="+33 6 12 34 56 78"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Poste"
                  defaultValue="Directeur"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  defaultValue="Directeur chez StudiMOVE, spécialisé dans l'organisation de voyages étudiants depuis 10 ans."
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Mettre à jour le profil
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Utilisateurs du système
          </Typography>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => handleOpenUserDialog()}
            >
              Nouvel utilisateur
            </Button>
          </Box>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      {user.email} • Rôle: {user.role}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.status === 'active'}
                        onChange={() => handleToggleUserStatus(user.id)}
                        color="primary"
                      />
                    }
                    label={user.status === 'active' ? 'Actif' : 'Inactif'}
                  />
                  <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={() => handleOpenUserDialog(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Entreprise */}
        <TabPanel value={tabValue} index={1}>
          <Box component="form" noValidate onSubmit={handleUpdateCompanyInfo}>
            <Typography variant="h6" gutterBottom>
              Informations de l'entreprise
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nom de l'entreprise"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleCompanyInfoChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email de contact"
                  name="email"
                  value={companyInfo.email}
                  onChange={handleCompanyInfoChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleCompanyInfoChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Logo"
                  name="logo"
                  value={companyInfo.logo}
                  onChange={handleCompanyInfoChange}
                  helperText="Chemin du fichier ou URL"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresse"
                  name="address"
                  value={companyInfo.address}
                  onChange={handleCompanyInfoChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enregistrer les modifications
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Sécurité */}
        <TabPanel value={tabValue} index={2}>
          <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
              Changer le mot de passe
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mot de passe actuel"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <div></div> {/* Élément vide pour maintenir l'alignement */}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Mettre à jour le mot de passe
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Authentification à deux facteurs
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Activer l'authentification à deux facteurs"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte. 
                  En plus de votre mot de passe, vous devrez fournir un code envoyé à votre téléphone.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Notifications */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Préférences de notification
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Notifications par email"
                secondary="Recevoir des notifications importantes par email"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleToggleNotification('emailNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Notifications par SMS"
                secondary="Recevoir des alertes par SMS pour les informations urgentes"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleToggleNotification('smsNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Notifications dans l'application"
                secondary="Recevoir des notifications dans l'application"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.appNotifications}
                  onChange={handleToggleNotification('appNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Résumé quotidien"
                secondary="Recevoir un résumé quotidien de l'activité"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.dailySummary}
                  onChange={handleToggleNotification('dailySummary')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Rappels d'événements"
                secondary="Recevoir des rappels pour les événements à venir"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.eventReminders}
                  onChange={handleToggleNotification('eventReminders')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Messages marketing"
                secondary="Recevoir des offres et des promotions"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationSettings.marketingMessages}
                  onChange={handleToggleNotification('marketingMessages')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Box mt={3}>
            <Button variant="contained" color="primary">
              Enregistrer les préférences
            </Button>
          </Box>
        </TabPanel>
      </Paper>

      {/* Dialogue pour ajouter/modifier un utilisateur */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentUser ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom complet"
                name="name"
                value={userForm.name}
                onChange={handleUserFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Rôle"
                name="role"
                value={userForm.role}
                onChange={handleUserFormChange}
                required
              >
                <MenuItem value="admin">Administrateur</MenuItem>
                <MenuItem value="manager">Gestionnaire</MenuItem>
                <MenuItem value="user">Utilisateur</MenuItem>
              </TextField>
            </Grid>
            {!currentUser && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    name="password"
                    type="password"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    required={!currentUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                    type="password"
                    value={userForm.confirmPassword}
                    onChange={handleUserFormChange}
                    required={!currentUser}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmitUser} 
            variant="contained" 
            color="primary"
            disabled={
              !userForm.name || 
              !userForm.email || 
              (!currentUser && (!userForm.password || userForm.password !== userForm.confirmPassword))
            }
          >
            {currentUser ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;

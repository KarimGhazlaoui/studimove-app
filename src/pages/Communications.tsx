import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Send as SendIcon,
  Sms as SmsIcon,
  InsertDriveFile as TemplateIcon,
  NotificationsActive as NotificationIcon
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
      id={`communications-tabpanel-${index}`}
      aria-labelledby={`communications-tab-${index}`}
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

const Communications: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  // Historique de communications fictif
  const communications = [
    {
      id: '1',
      type: 'email',
      subject: 'Informations importantes pour votre voyage à Barcelone',
      content: 'Bonjour à tous, voici les dernières informations concernant notre voyage à Barcelone...',
      sentDate: '2023-05-20T10:30:00Z',
      recipients: 120,
      sender: 'Nicolas Gagnon'
    },
    {
      id: '2',
      type: 'sms',
      subject: 'Rappel départ',
      content: 'Rappel: RDV demain à 7h à la gare pour le départ vers Barcelone.',
      sentDate: '2023-06-14T15:45:00Z',
      recipients: 118,
      sender: 'Nicolas Gagnon'
    },
    {
      id: '3',
      type: 'notification',
      subject: 'Changement d\'hôtel',
      content: 'Nous avons dû changer l\'hôtel pour notre séjour. Veuillez consulter l\'application pour plus de détails.',
      sentDate: '2023-05-30T09:15:00Z',
      recipients: 120,
      sender: 'Système'
    }
  ];

  // Modèles de messages fictifs
  const templates = [
    {
      id: '1',
      name: 'Accueil voyageurs',
      type: 'email',
      subject: 'Bienvenue dans notre voyage!',
      content: 'Chers participants, nous sommes ravis de vous accueillir pour ce voyage à {destination}...'
    },
    {
      id: '2',
      name: 'Rappel départ',
      type: 'sms',
      subject: 'RAPPEL',
      content: 'Rappel: RDV demain à {heure} à {lieu} pour le départ vers {destination}.'
    },
    {
      id: '3',
      name: 'Consignes de sécurité',
      type: 'email',
      subject: 'Consignes de sécurité importantes',
      content: 'Pour votre sécurité pendant le voyage, veuillez noter les points suivants: ...'
    }
  ];

  // Groupes de participants fictifs
  const groups = [
    { id: '1', name: 'Tous les participants', count: 120 },
    { id: '2', name: 'Groupe Bus 1', count: 50 },
    { id: '3', name: 'Groupe Bus 2', count: 50 },
    { id: '4', name: 'Groupe Avion', count: 20 },
    { id: '5', name: 'Hébergement Hôtel Barceló', count: 80 },
    { id: '6', name: 'Hébergement Appart-Hôtel', count: 40 }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSelectRecipient = (groupId: string) => {
    if (selectedRecipients.includes(groupId)) {
      // Retirer de la sélection
      setSelectedRecipients(selectedRecipients.filter(id => id !== groupId));
    } else {
      // Ajouter à la sélection
      setSelectedRecipients([...selectedRecipients, groupId]);
    }
  };

  const handleSendMessage = () => {
    // Logique pour envoyer le message ici
    console.log('Message envoyé aux groupes:', selectedRecipients);
    console.log('Contenu du message:', newMessage);
    
    // Réinitialiser après envoi
    setNewMessage('');
    setSelectedRecipients([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Communications
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="communications tabs"
          variant="fullWidth"
        >
          <Tab icon={<EmailIcon />} label="Nouveau message" />
          <Tab icon={<NotificationIcon />} label="Historique" />
          <Tab icon={<TemplateIcon />} label="Modèles" />
        </Tabs>

        {/* Nouvel email/SMS */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="Composer un message" />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Type de message"
                        defaultValue="email"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="notification">Notification application</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Objet"
                        placeholder="Entrez l'objet du message"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={newMessage}
                        onChange={handleMessageChange}
                        placeholder="Rédigez votre message ici..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          color="primary"
                          endIcon={<SendIcon />}
                          onClick={handleSendMessage}
                          disabled={!newMessage || selectedRecipients.length === 0}
                        >
                          Envoyer
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Destinataires" />
                <CardContent>
                  <List dense>
                    {groups.map((group) => (
                      <ListItem 
                        key={group.id}
                        button 
                        onClick={() => handleSelectRecipient(group.id)}
                        selected={selectedRecipients.includes(group.id)}
                        sx={{ 
                          '&.Mui-selected': { 
                            bgcolor: 'rgba(25, 118, 210, 0.12)' 
                          } 
                        }}
                      >
                        <ListItemText 
                          primary={group.name}
                          secondary={`${group.count} participants`}
                        />
                        {selectedRecipients.includes(group.id) && (
                          <Chip 
                            size="small" 
                            color="primary" 
                            label="Sélectionné" 
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Historique des communications */}
        <TabPanel value={tabValue} index={1}>
          <List>
            {communications.map((comm, index) => (
              <React.Fragment key={comm.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {comm.type === 'email' ? <EmailIcon /> : 
                       comm.type === 'sms' ? <SmsIcon /> : <NotificationIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">{comm.subject}</Typography>
                        <Chip 
                          size="small"
                          label={comm.type === 'email' ? 'Email' : 
                                comm.type === 'sms' ? 'SMS' : 'Notification'}
                          color={comm.type === 'email' ? 'primary' : 
                                comm.type === 'sms' ? 'secondary' : 'info'}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textPrimary" component="span">
                          {comm.content.substring(0, 100)}
                          {comm.content.length > 100 ? '...' : ''}
                        </Typography>
                        <Box mt={1} display="flex" justifyContent="space-between">
                          <Typography variant="caption">
                            Envoyé par: {comm.sender}
                          </Typography>
                          <Typography variant="caption">
                            {formatDate(comm.sentDate)} • {comm.recipients} destinataires
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < communications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Modèles de messages */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            {templates.map((template) => (
              <Grid item xs={12} md={6} lg={4} key={template.id}>
                <Card>
                  <CardHeader
                    title={template.name}
                    subheader={template.type === 'email' ? 'Email' : 
                              template.type === 'sms' ? 'SMS' : 'Notification'}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      {template.subject}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {template.content.substring(0, 150)}
                      {template.content.length > 150 ? '...' : ''}
                    </Typography>
                  </CardContent>
                  <Box p={2} display="flex" justifyContent="flex-end">
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => {
                        setTabValue(0);
                        setNewMessage(template.content);
                      }}
                    >
                      Utiliser ce modèle
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Communications;

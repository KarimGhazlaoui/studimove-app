import React from 'react';
import { 
  Box, Typography, Grid, Paper, Button, 
  List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { 
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Add as AddIcon
} from '@mui/icons-material';

const Documents = () => {
  // Exemple de documents
  const documents = [
    { id: 1, name: 'Formulaire d\'autorisation parentale', type: 'pdf', size: '245 KB', updatedAt: '10/05/2023' },
    { id: 2, name: 'Planning du voyage à Barcelone', type: 'doc', size: '125 KB', updatedAt: '15/05/2023' },
    { id: 3, name: 'Liste des participants - Voyage Rome', type: 'xls', size: '180 KB', updatedAt: '20/05/2023' },
    { id: 4, name: 'Photo de groupe - Sortie Paris', type: 'jpg', size: '2.4 MB', updatedAt: '01/06/2023' },
  ];

  // Fonction pour déterminer l'icône selon le type de document
  const getDocumentIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <PdfIcon color="error" />;
      case 'jpg':
      case 'png':
        return <ImageIcon color="primary" />;
      default:
        return <DescriptionIcon color="action" />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Documents
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Ajouter un document
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <List>
              {documents.map((doc) => (
                <ListItem 
                  key={doc.id}
                  button
                  sx={{ borderBottom: '1px solid #eee', py: 1.5 }}
                >
                  <ListItemIcon>
                    {getDocumentIcon(doc.type)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={doc.name} 
                    secondary={`${doc.type.toUpperCase()} • ${doc.size} • Dernière modification: ${doc.updatedAt}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Documents;
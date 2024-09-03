import React from 'react';
import { Box, Grid, Typography, Container, Button, Paper } from '@mui/material';

const clientData = [
  { id: 1, name: 'Client A', email: 'clienta@example.com' },
  { id: 2, name: 'Client B', email: 'clientb@example.com' },
  // Add more client data as needed
];

const Client = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        overflowX: 'hidden', // Prevent horizontal scrolling
        px: 2, // Add padding to the sides for better spacing
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Client Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage and view your clients efficiently with our inventory management system.
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button variant="contained" color="primary">
          Add New Client
        </Button>
      </Box>

      <Paper sx={{ p: 2, overflowX: 'hidden' }}> {/* Ensure no horizontal overflow */}
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Client List
        </Typography>
        <Grid container spacing={2}>
          {clientData.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {client.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Email: {client.email}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 'bold' }}>
          Efficiently manage and track your clients with our powerful tools.
        </Typography>
      </Box>
    </Container>
  );
};

export default Client;

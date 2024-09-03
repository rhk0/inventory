import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider, Button } from '@mui/material';
import Logo from "../assets/m_logo.png"; // Adjust the path to your company logo image

const Contact = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        px: 2, 
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      {/* Company Logo */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <img src={Logo} alt="Company Logo" style={{ maxWidth: '200px', width: '100%' }} />
      </Box>

      {/* Contact Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ textAlign: 'center' }}>
          111B, 80 Feet Rd, above Bhagwan Ustad gulab jamu wala, Old Ashoka Garden, Ashoka Garden, Bhopal, Madhya Pradesh 462023
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ textAlign: 'center' }}>
          203 Shagun Arcade, near Medanta Hospital, at Rashoma Square, Vijay Nagar, Indore
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ textAlign: 'center' }}>
          📞 8319056741
        </Typography>
      </Box>

      {/* Footer Links */}
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link href="#" variant="body1">Terms</Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body1">Privacy</Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body1">Cookies</Link>
        </Grid>
      </Grid>

      {/* Menu */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Menu
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Home</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>About Us</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Services</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Portfolio</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Products</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Team</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Reviews</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="outlined" fullWidth>Contact Us</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;

import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider, Button, TextField } from '@mui/material';
import Logo from "../assets/m_logo.png"; // Adjust the path to your logo

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
      {/* Header Section with Logo and Form */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        {/* Company Logo */}
        <img src={Logo} alt="Company Logo" style={{ maxWidth: '300px', width: '100%' }} />

        {/* Contact Form */}
        <Box
          component="form"
          sx={{
            width: '60%',
            height: '60vh',
            border: '',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            Get in Touch
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Enter your name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                placeholder="Enter your contact number"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email ID"
            placeholder="Enter your email address"
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Tell Us More"
            placeholder="Share more details with us"
            multiline
            rows={4}
            variant="outlined"
          />

          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>

      {/* Contact Information */}
      <Box sx={{ my: 4,mt:4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          📞 8319056741
        </Typography>
      </Box>

      {/* Footer Links */}
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link href="#" variant="body1">
            Terms
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body1">
            Privacy
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body1">
            Cookies
          </Link>
        </Grid>
      </Grid>

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

import React, { useState, useEffect } from 'react';
import {
  Avatar,
  CssBaseline,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useAuth } from "../context/Auth.js";

// Create a theme instance
const theme = createTheme({
  spacing: 8, // Ensure spacing is correctly defined
});

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  
  // Manage form state using useState hook
  const [formData, setFormData] = useState({
    businessName: '',
    userName: '',
    address: '',
    contact: '',
    email: '',
    password: '',
    businessType: '',
  });
  
  const [auth, setAuth] = useAuth();
  
  // Set form data when component mounts or auth changes
  console.log(auth.user,"password")
  useEffect(() => {
    if (auth && auth.user) {
      setFormData({
        businessName: auth.user.businessName || '',
        userName: auth.user.userName || '',
        address: auth.user.address || '',
        contact: auth.user.contact || '',
        email: auth.user.email || '',
        password: auth.user.password, // Ideally, you don't pre-fill the password for security reasons
        businessType: auth.user.businessType || '',
      });
    }
  }, [auth]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log form data before sending
    console.log('Form Data:', formData);
  
    try {
      const response = await axios.post(`/api/v1/auth/updateuser/${auth.user._id}`, formData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is correct
        },
      });
      
      console.log('Profile updated successfully:', response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Failed to update profile:', error.response.data.message);
      } else {
        // Error occurred in setting up the request
        console.error('Error updating profile:', error.message);
      }
    }
  };
  

  return (
    <div className="responsive-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile Update
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="bname"
                    name="businessName"
                    variant="outlined"
                    required
                    fullWidth
                    id="businessName"
                    label="Business Name"
                    autoFocus
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="uname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="address"
                    name="address"
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="contact"
                    name="contact"
                    variant="outlined"
                    required
                    fullWidth
                    id="contact"
                    label="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="businessType"
                    name="businessType"
                    variant="outlined"
                    required
                    fullWidth
                    id="businessType"
                    label="Business Type"
                    value={formData.businessType}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

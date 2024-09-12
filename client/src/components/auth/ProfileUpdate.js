import React from 'react';
import {
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

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

  return (
    <div className="responsive-container">
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Profile Update 
          </Typography>
          <form className={classes.form} noValidate>
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
                  label=" Address"
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

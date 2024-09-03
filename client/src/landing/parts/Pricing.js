import React from 'react';
import { Box, Typography, Container, Grid, Button, Paper } from '@mui/material';

const plans = [
  {
    title: 'Basic Plan',
    price: '$19/month',
    features: ['1 User', '10GB Storage', 'Basic Support'],
  },
  {
    title: 'Standard Plan',
    price: '$49/month',
    features: ['5 Users', '50GB Storage', 'Priority Support'],
  },
  {
    title: 'Premium Plan',
    price: '$99/month',
    features: ['Unlimited Users', '200GB Storage', '24/7 Support'],
  },
];

const Pricing = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        px: 2, // Add padding to the x-axis for responsive design
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Pricing Plans
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Choose the plan that's right for you. All plans come with a 30-day free trial.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {plan.title}
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                {plan.price}
              </Typography>
              <Box sx={{ mb: 2 }}>
                {plan.features.map((feature, idx) => (
                  <Typography key={idx} variant="body1">
                    {feature}
                  </Typography>
                ))}
              </Box>
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          Not sure which plan is right for you? <Button color="primary">Contact Us</Button> for personalized recommendations.
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing;

import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Benefits = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        overflowX: 'hidden', // Prevent horizontal scrolling
        px: 2, // Add padding on left and right for better spacing
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Benefits of Our Inventory Management System
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover how our inventory management system can transform your business operations.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/** Define each benefit as a grid item */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Real-Time Inventory Tracking
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Keep an eye on your stock levels in real-time. Our system provides up-to-date information so you can make informed decisions quickly.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Cost Efficiency
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Reduce excess inventory and minimize stockouts. Save money by optimizing your stock levels and preventing unnecessary purchases.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Enhanced Productivity
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Automate routine tasks and free up your team to focus on more important activities. Improve overall productivity and efficiency.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Scalability
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Our system grows with your business. Whether you expand to new locations or add more products, our solution is designed to scale with you.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Seamless Integration
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Integrate with your existing systems effortlessly. Our inventory management system works with your POS, e-commerce, and accounting tools.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Data-Driven Insights
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Make better decisions with detailed reports and analytics. Our system provides valuable insights into your inventory trends and performance.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 'bold' }}>
          Unlock the full potential of your business with our inventory management system.
        </Typography>
      </Box>
    </Container>
  );
};

export default Benefits;

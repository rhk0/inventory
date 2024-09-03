import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Container
      maxWidth="xlg"
      sx={{
        backgroundColor: '#F6F9FE',
        mt: 4,
        overflowX: 'hidden', // Prevent horizontal scrolling
        
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          About Our Inventory Management System
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Streamline your business operations with our advanced, user-friendly inventory management system.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Efficient Inventory Tracking
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our system allows you to track your inventory in real-time, giving you complete visibility into your stock levels.
          Whether you're managing a small retail shop or a large warehouse, our tools are designed to meet your needs.
          With automated reordering and detailed reporting, you can prevent stockouts and reduce excess inventory, saving both time and money.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Seamless Integration and Scalability
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our inventory management system seamlessly integrates with your existing tools and platforms, including POS systems, e-commerce platforms, and accounting software.
          It's scalable to grow with your business, whether you have one location or multiple stores. Our cloud-based solution ensures that your data is secure and accessible from anywhere.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          User-Friendly Interface
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We understand that not everyone is tech-savvy. That's why we've designed our inventory management system with a user-friendly interface that is easy to navigate.
          With intuitive dashboards and simple workflows, you can manage your inventory without a steep learning curve.
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 'bold' }}>
          Transform the way you manage your inventory. Experience the difference with our system today!
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

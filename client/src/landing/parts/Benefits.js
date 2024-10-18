import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { Inventory, Savings, TrendingUp, Expand, IntegrationInstructions, Insights } from '@mui/icons-material';

const benefitsData = [
  {
    title: 'Real-Time Inventory Tracking',
    description: 'Keep an eye on your stock levels in real-time. Our system provides up-to-date information so you can make informed decisions quickly.',
    icon: <Inventory fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
  {
    title: 'Cost Efficiency',
    description: 'Reduce excess inventory and minimize stockouts. Save money by optimizing your stock levels and preventing unnecessary purchases.',
    icon: <Savings fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
  {
    title: 'Enhanced Productivity',
    description: 'Automate routine tasks and free up your team to focus on more important activities. Improve overall productivity and efficiency.',
    icon: <TrendingUp fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
  {
    title: 'Scalability',
    description: 'Our system grows with your business. Whether you expand to new locations or add more products, our solution is designed to scale with you.',
    icon: <Expand fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
  {
    title: 'Seamless Integration',
    description: 'Integrate with your existing systems effortlessly. Our inventory management system works with your POS, e-commerce, and accounting tools.',
    icon: <IntegrationInstructions fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
  {
    title: 'Data-Driven Insights',
    description: 'Make better decisions with detailed reports and analytics. Our system provides valuable insights into your inventory trends and performance.',
    icon: <Insights fontSize="large" sx={{ color: '#6a1b9a' }} />,
  },
];

const Benefits = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        overflowX: 'hidden',
        px: 3,
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        py: 6,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', mb: 2, color: '#4a148c', textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}
        >
          Benefits of Our Inventory Management System
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover how our inventory management system can transform your business operations.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {benefitsData.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                borderRadius: '15px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1, color: '#4a148c' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {benefit.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Unlock the full potential of your business with our inventory management system.
        </Typography>
      </Box>
    </Container>
  );
};

export default Benefits;

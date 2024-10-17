import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import landingImg from '../assets/invenoty.png';
import Typewriter from 'react-typewriter-effect';
import Carousel from 'react-material-ui-carousel';

const Home = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', }}> {/* Added paddingTop */}
      {/* Carousel at the top with responsive styles */}
      <Carousel 
        autoPlay
        interval={3000}
        indicators={false}
        sx={{ 
          width: '100%', 
          paddingTop: '50px',
          height: { xs: '150px', sm:'200px', md: '90px' }, // Adjust height for different screen sizes
          backgroundColor: '#f5f5f5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow
          '& .MuiTypography-root': {
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Adjust text size for different screen sizes
          }
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', px: 2 }}>
          Optimize Your Stock and Streamline Operations
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', px: 2 }}>
          Efficiently Manage Inventory and Orders from One Platform
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', px: 2 }}>
          Elevate Your Inventory Management with Advanced Tools
        </Typography>
      </Carousel>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: { xs: 'center', md: 'left' },
          backgroundColor: '#f5f5f5',
          px: 2,
          position: 'relative',
          minHeight: '60vh',
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: { xs: '1rem', md: '2rem' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom className="typewriter-text">
            <Typewriter
              textStyle={{
                fontFamily: 'Oswald, sans-serif',
                color: '#6a1b9a',
              }}  
              cursorColor="#6a1b9a"
              multiText={[
                'Inventory Management System',
                'Stock Control',
                'Order Tracking',
                'Warehouse Management'
              ]}
              multiTextDelay={1000}
              typeSpeed={100}
              multiTextLoop
              hideCursorAfterText={true}
            />
          </Typography>

          <Button variant="contained" color="primary" size="small" href="#about" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: '1rem', md: '2rem' },
            position: 'relative',
            zIndex: 0,
          }}
        >
          <img
            src={landingImg}
            alt="Inventory"
            style={{
              maxWidth: '100%',
              height: 'auto', // Ensure image scales proportionally
              animation: 'rotate 8s linear infinite',
            }}
          />
        </Box>
      </Box>

      <style>
        {`
          @keyframes rotate {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .typewriter-text {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            color: #6a1b9a;
          }
        `}
      </style>
    </div>
  );
};

export default Home;

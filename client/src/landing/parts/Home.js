// Home.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import landingImg from '../assets/invenoty.png';
import Typewriter from 'react-typewriter-effect';
import Carousel from 'react-material-ui-carousel';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Carousel at the top with full width */}
      <Carousel 
        autoPlay
        interval={3000}
        indicators={false}
        sx={{ paddingTop: "30px", paddingBottom: "30px", width: '100%', height: '90px', backgroundColor: '#f5f5f5' }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Optimize Your Stock and Streamline Operations
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Efficiently Manage Inventory and Orders from One Platform
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
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
          }}
        >
          <img
            src={landingImg}
            alt="Inventory"
            style={{
              maxWidth: '100%',
              height: '100%',
              animation: 'rotate 8s linear infinite',
            }}
          />
        </Box>
      </Box>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            backgroundColor: '#007BFF',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}

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

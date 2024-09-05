
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import mLogo from './assets/manasvilogo.png';

// Include the Oswald font from Google Fonts
const oswaldFont = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap';

const drawerWidth = 170;

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Client', id: 'client' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Benefits', id: 'benefits' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Ensure window is defined before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Box component="img" src={mLogo} alt="Logo" sx={{ width: "50%", my: 2 }} />
      <Divider />
      <List>
        {navItems.map((item) => (
          <MenuItem key={item.label} disablePadding>
            <ListItemButton
              href={`#${item.id}`}
              sx={{
                textAlign: 'left',
                fontSize: '14px',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 'bold',
                color: '#333333',
                mx: 0.5,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </MenuItem>
        ))}
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#007BFF',
            color: '#FFFFFF',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Book a Demo
        </Button>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#000000',
          boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)',
          fontFamily: 'Roboto, sans-serif',
          height: '70px',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          padding: 0, // Remove extra padding
          marginBottom: { xs: 0, md: '20px' }, // Add margin bottom on larger screens
          '& link': {
            fontFamily: 'Oswald, sans-serif',
          },
        }}
      >
        <link href={oswaldFont} rel="stylesheet" />
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px', px: 2 }}>
          {/* Mobile view logo and menu icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Box
              component="img"
              src={mLogo}
              alt="Logo"
              sx={{ width: 200, height: 'auto', mr: 4 }}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr:4,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={mLogo}
              alt="Logo"
              sx={{ width: 100, height: 'auto', display: { xs: 'none', md: 'block' }, mr: 2 }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 5,
              position: 'relative',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={`#${item.id}`}
                sx={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '21px',
                  fontWeight: '700',
                  color: "#9001BA",
                  position: 'relative',
                  textTransform: 'none',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: 'red',
                    boxShadow: '0 2px 4px rgba(255, 0, 0, 0.5)',
                    transition: 'width 0.2s ease, box-shadow 0.2s ease',
                  },
                  '&:hover:before': {
                    width: '100%',
                  },
                  '&:hover': {
                    boxShadow: 'none',
                    color: '#007BFF',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007BFF',
              color: '#FFFFFF',
              borderRadius: '20px',
              textTransform: 'none',
              px: 3,
              display: { xs: 'none', md: 'block' },
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Book a Demo
          </Button>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box
        component="main"
        sx={{ flexGrow: 1, ml: 2 }}
      >
        <Toolbar />
        <Typography>
          <Box>{/* Content will be rendered here based on the route */}</Box>
        </Typography>
      </Box>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
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
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;

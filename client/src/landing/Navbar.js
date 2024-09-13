import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import mLogo from "./assets/manasvilogo.png";
import DemoForm from "./DemoForm"; // Import your DemoForm component

// Include the Oswald font from Google Fonts
const oswaldFont =
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap";

const drawerWidth = 170;

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Client", id: "client" },
  { label: "Pricing", id: "pricing" },
  { label: "Benefits", id: "benefits" },
  { label: "Contact", id: "contact" },
  { label: "Free Trial", href: "/registration" },
  { label: "Login", href: "/login" },
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
      behavior: "smooth",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Ensure window is defined before adding event listener
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Box
        component="img"
        src={mLogo}
        alt="Logo"
        sx={{ width: "50%", my: 2 }}
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <MenuItem key={item.label} disablePadding>
            <ListItemButton
              // href={`${item.id}`}
              href={item.href ? item.href : `#${item.id}`}
              sx={{
                textAlign: "left",
                fontSize: "14px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: "bold",
                color: "#333333",
                mx: 0.5,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </MenuItem>
        ))}
        <Button
          variant="contained"
          onClick={handleOpenModal} // Open modal on button click
          sx={{
            mt: 2,
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            borderRadius: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Book a Demo
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        // position="fixed"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
          boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
          fontFamily: "Roboto, sans-serif",
          height: "70px",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          padding: 0,
          marginBottom: { xs: 0, md: "20px" },
        }}
      >
        <link href={oswaldFont} rel="stylesheet" />
        <Toolbar
          sx={{ justifyContent: "space-between", minHeight: "70px", px: 1 }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={mLogo}
              alt="Logo"
              sx={{ width: 200, height: "auto", mr: 1 }}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                mr: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={mLogo}
              alt="Logo"
              sx={{
                width: 270,
                height: "auto",
                display: { xs: "none", md: "block" },
                mr: 2,
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              px: { lg: 1 }, // Apply px:2 only on medium screens and above
              gap: { lg: 1 }, // Apply gap:2 only on medium screens and above,
              position: "relative",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                // href={`#${item.id}`}
                href={item.href ? item.href : `#${item.id}`}
                sx={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "21px",
                  fontWeight: "700",
                  color: "#9001BA",
                  position: "relative",
                  textTransform: "none",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    backgroundColor: "red",
                    boxShadow: "0 2px 4px rgba(255, 0, 0, 0.5)",
                    transition: "width 0.2s ease, box-shadow 0.2s ease",
                  },
                  "&:hover:before": {
                    width: "100%",
                  },
                  "&:hover": {
                    boxShadow: "none",
                    color: "#007BFF",
                  },
                }}
              >
                <span className="text-nowrap"> {item.label}</span>
              </Button>
            ))}
          </Box>

          <Button
            onClick={handleOpenModal} // Open modal on button click
            sx={{
              backgroundColor: "#6A1B9A",
              color: "#FFFFFF",
              borderRadius: "10px",
              textTransform: "none",
              paddingX: { xs: "10px", md: "20px", lg: "40px" },
              fontSize: { xs: "10px", md: "14px", lg: "14px" }, // Responsive font size
              display: { xs: "none", md: "block" },
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            <span className="text-nowrap "> Book Demo</span>
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
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main" sx={{ flexGrow: 1, ml: 2 }}>
        <Toolbar />
        <Typography>
          <Box>{/* Content will be rendered here based on the route */}</Box>
        </Typography>
      </Box>

      

      {/* Modal with DemoForm */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <DemoForm />
      </Modal>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;

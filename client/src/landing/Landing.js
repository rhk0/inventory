// Landing.js
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Navbar from './Navbar';
import Home from './parts/Home';
import About from './parts/About';
import Benefits from './parts/Benefits';
import Client from './parts/Client';
import Contact from './parts/Contact';
import Pricing from './parts/Pricing';

const Section = ({ id, children, aos }) => {
  return (
    <div
      id={id}
      data-aos={aos}
      style={{
        width: '100%',
        scrollMarginTop: '70px', // Adjust according to your Navbar height
      }}
    >
      {children}
    </div>
  );
};

const Landing = () => {
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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Pass the scrollToSection function to the Navbar to handle section navigation */}
      <Navbar
        onHomeClick={() => scrollToSection('home')}
        onAboutClick={() => scrollToSection('about')}
        onClientClick={() => scrollToSection('client')}
        onContactClick={() => scrollToSection('contact')}
        onPricingClick={() => scrollToSection('pricing')}
        onBenefitsClick={() => scrollToSection('benefits')}
      />

      {/* Home Section */}
      <Section id="home" aos="flip-right">
        <Home />
      </Section>

      {/* Other sections */}
      <Section id="about" aos="flip-right">
        <About />
      </Section>

      <Section id="client" aos="flip-right">
        <Client />
      </Section>

      <Section id="contact" aos="flip-right">
        <Contact />
      </Section>

      <Section id="pricing" aos="flip-right">
        <Pricing />
      </Section>

      <Section id="benefits" aos="flip-right">
        <Benefits />
      </Section>

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
    </div>
  );
};

export default Landing;

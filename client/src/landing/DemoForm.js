import { State } from 'country-state-city'; // import State data
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import img1 from './assets/demo.jpeg'; // Importing the image

const DemoForm = () => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    contactNumber: '',
    city: '',
    email:'',
    state:''
  });
  const [apiResponse, setApiResponse] = useState(null);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData); // Dummy API
      setApiResponse(response.data);
      handleClose(); // Close dialog on successful submission
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Schedule a One-on-One Demo
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {/* Image Section */}
            <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
              <img 
                src={img1} 
                alt="Demo" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: 8 
                }} 
              />
            </Box>
            {/* Form Fields */}
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Business Name"
              type="text"
              name="businessName"
              fullWidth
              variant="outlined"
              value={formData.businessName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Contact Number"
              type="tel"
              name="contactNumber"
              fullWidth
              variant="outlined"
              value={formData.contactNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />  
            <TextField
              margin="dense"
              label="Email"
              type="text"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="City"
              type="text"
              name="city"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            
            {/* State Dropdown */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="state-label">Select state</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                label="State"
              >
                {State.getStatesOfCountry('IN').map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display API response */}
            {apiResponse && (
              <Box sx={{ mt: 2 }}>
                <h3>API Response:</h3>
                <p><strong>ID:</strong> {apiResponse.id}</p>
                <p><strong>Title:</strong> {apiResponse.title}</p>
                <p><strong>Body:</strong> {apiResponse.body}</p>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Book a Demo
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DemoForm;

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import img1 from './assets/invenoty.png'; // Importing the image

const DemoForm = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Request a Free Demo
      </Button>
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
              alt="Inventory" 
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
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Business Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Contact Number"
            type="tel"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Book a Demo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DemoForm;

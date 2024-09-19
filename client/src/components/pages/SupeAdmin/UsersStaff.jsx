import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Box, Paper, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const UsersStaff = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/super/all-users');
        console.log(response);

        // Extracting users from the response data
        const users = response.data.users;
        setUsers(users);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="responsive-container">
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'purple',
            color: 'white',
            borderRadius: '5px',
            padding: '2px 6px',
            marginBottom: '4px',
          }}
        >
        Select User
        </span>
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Paper sx={{ padding: 2 }}>
        <List>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <ListItem key={user._id}>
                <ListItemText primary={user.userName} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No users found.
            </Typography>
          )}
        </List>
      </Paper>
    </div>
  );
};

export default UsersStaff;

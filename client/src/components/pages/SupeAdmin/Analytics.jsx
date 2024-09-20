import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress } from '@mui/material';

const Analytics = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/super/all-users');
        const users = response.data.users;

        // Group data by createdAt date and count the number of users for each day
        const formattedData = users.reduce((acc, user) => {
          const date = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
          if (date) {
            if (!acc[date]) acc[date] = 0;
            acc[date] += 1; // Increment user count for this date
          }
          return acc;
        }, {});

        // Convert grouped data into an array for chart consumption
        const chartData = Object.keys(formattedData).map(date => ({
          date, // This will be a string in 'MM/DD/YYYY' format or similar
          count: formattedData[date], // User count for that date
        }));

        setUserData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Show loader while data is being fetched
  if (loading) return <CircularProgress />;

  return (
    <div className="responsive-container" style={{ maxWidth: '800px', margin: '0 auto' }} data-aos="zoom-in-up">
      <h2>User Creation Timeline</h2>
      <LineChart
        dataset={userData}
        xAxis={[
          {
            id: 'createdAt',
            dataKey: 'date', 
            scaleType: 'band', 
            valueFormatter: (date) => date, 
            label: 'Date', 
          },
        ]}
        series={[
          {
            id: 'Users',
            label: 'User Signups',
            dataKey: 'count', 
            area: true,
            showMark: true, 
          },
        ]}
        width={800}
        height={400}
        margin={{ left: 50, right: 50, top: 20, bottom: 40 }}
      />
    </div>
  );
};

export default Analytics;

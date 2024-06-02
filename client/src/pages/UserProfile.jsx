import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const UserProfile = () => {
  // נתוני הדוגמאות, ניתן לעדכן בנתונים אמתיים
  const userData = {
    UserId: 1,
    PasswordId: 123,
    FirstName: 'John',
    LastName: 'Doe',
    AddressId: 456,
    Phone: '123-456-7890',
    Mail: 'john.doe@example.com',
    Role: 'Volunteer'
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">User Profile</Typography>
        </Grid>
        {Object.keys(userData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography variant="body1"><strong>{key}:</strong> {userData[key]}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserProfile;

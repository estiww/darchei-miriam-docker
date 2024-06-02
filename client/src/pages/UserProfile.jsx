import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Container, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // Here you would typically also send the updated details to your server
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
        <IconButton onClick={toggleEditMode} style={{ marginLeft: '10px' }}>
          <EditIcon />
        </IconButton>
      </Typography>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Name</Typography>
            <Typography>{userDetails.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Email</Typography>
            <Typography>{userDetails.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography>{userDetails.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Address</Typography>
            <Typography>{userDetails.address}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default UserProfile;

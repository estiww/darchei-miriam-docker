import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import UserProfile from './UserProfile';
import TravelRequests from './TravelRequests';
import TravelMatches from './TravelMatches';
import TravelRequestForm from './TravelRequestForm';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('currentUser');
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <AppBar position="fixed" style={{ width: '100%' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Application</Typography>
          {currentUser && (
            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', gap: '20px' }}>
              <Button color="inherit" component={Link} to="/home">Home</Button>
              <Button color="inherit" component={Link} to="travelRequests">בקשות פתוחת</Button>
              <Button color="inherit" component={Link} to="travelMatches">TravelMatches</Button>
              <Button color="inherit" component={Link} to="travelRequestForm">TravelRequestForm</Button>
            </div>
          )}
          <div>
            {currentUser ? (
              <IconButton edge="end" color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
            ) : (
              <Button color="inherit" component={Link} to="/login">Log In</Button>
            )}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose} component={Link} to="profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="TravelRequests" element={<TravelRequests />} />
          <Route path="travelMatches" element={<TravelMatches />} />
          <Route path="travelRequestForm" element={<TravelRequestForm />} />
          <Route path="profile" element={<UserProfile />} />
        </Routes>
      </Container>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h6">Home</Typography>
        <Typography>Welcome to the home page!</Typography>
        {currentUser ? (
          <Typography>Welcome back!</Typography>
        ) : (
          <Button variant="contained" onClick={() => navigate('/login')}>
            Log In
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

const OpenRequest = () => (
  <Grid container spacing={3} style={{ marginTop: 20 }}>
    <Grid item xs={12}>
      <Typography variant="h6">Column 1</Typography>
      <Typography>Content for column 1...</Typography>
    </Grid>
  </Grid>
);

const Column2 = () => (
  <Grid container spacing={3} style={{ marginTop: 20 }}>
    <Grid item xs={12}>
      <Typography variant="h6">Column 2</Typography>
      <Typography>Content for column 2...</Typography>
    </Grid>
  </Grid>
);

const Column3 = () => (
  <Grid container spacing={3} style={{ marginTop: 20 }}>
    <Grid item xs={12}>
      <Typography variant="h6">Column 3</Typography>
      <Typography>Content for column 3...</Typography>
    </Grid>
  </Grid>
);

const Profile = () => (
  <Grid container spacing={3} style={{ marginTop: 20 }}>
    <Grid item xs={12}>
      <Typography variant="h6">Profile</Typography>
      <Typography>Your profile details...</Typography>
    </Grid>
  </Grid>
);

export default Home;

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
import UserProfile from './UserProfile'; // ייבוא של הרכיב החדש

function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ width: '100%' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            My Application
          </Typography>
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', gap: '20px' }}>
            <Button color="inherit" component={Link} to="/home">Home</Button>
            <Button color="inherit" component={Link} to="column1">Column 1</Button>
            <Button color="inherit" component={Link} to="column2">Column 2</Button>
            <Button color="inherit" component={Link} to="column3">Column 3</Button>
          </div>
          <div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="profile">Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="column1" element={<Column1 />} />
          <Route path="column2" element={<Column2 />} />
          <Route path="column3" element={<Column3 />} />
          <Route path="profile" element={<UserProfile />} /> {/* שינוי ל-UserProfile */}
        </Routes>
      </Container>
    </div>
  );
}

const HomePage = () => (
  <Grid container spacing={3} style={{ marginTop: 20 }}>
    <Grid item xs={12}>
      <Typography variant="h6">Home</Typography>
      <Typography>Welcome to the home page!</Typography>
    </Grid>
  </Grid>
);

const Column1 = () => (
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

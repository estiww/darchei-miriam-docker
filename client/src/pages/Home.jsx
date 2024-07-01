import React, { useState, useContext } from 'react';
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
import { UserContext } from '../App'; // ייבוא הקונטקסט
import Users from './Users';
import Reminders from '../components/Reminders';
import CloseIcon from '@mui/icons-material/Close';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import MinimizeIcon from '@mui/icons-material/Minimize';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [minimizedReminders, setMinimizedReminders] = useState(false); // State to manage minimized status
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // שימוש בקונטקסט

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/logout/${user.id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null); // איפוס היוזר
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleReminders = () => {
    setMinimizedReminders(!minimizedReminders);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            My Application
          </Typography>
          <div>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="travelRequests">בקשות פתוחות</Button>
                <Button color="inherit" component={Link} to="travelMatches">Travel Matches</Button>
                <Button color="inherit" component={Link} to="travelRequestForm">Travel Request Form</Button>
                <Button color="inherit" component={Link} to="users">Users</Button>
                <IconButton color="inherit" onClick={handleMenu}>
                  <AccountCircle />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose} component={Link} to="profile">Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">Log In</Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '64px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="travelRequests" element={<TravelRequests />} />
          <Route path="travelMatches" element={<TravelMatches />} />
          <Route path="travelRequestForm" element={<TravelRequestForm />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Container>
      {user && user.roleName === "Volunteer" ? (
        <div style={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: 1300 }}>
          {minimizedReminders ? (
            <IconButton onClick={toggleReminders} style={{ backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
              <DriveEtaIcon />
            </IconButton>
          ) : (
            <div style={{ backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.3)', padding: '16px', width: '250px' }}>
              <IconButton onClick={toggleReminders} style={{ position: 'absolute', top: '8px', right: '8px' }}>
                <CloseIcon />
              </IconButton>
              <Reminders />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // שימוש בקונטקסט

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h6">Home</Typography>
        <Typography>Welcome to the home page!</Typography>
        {user ? (
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

export default Home;

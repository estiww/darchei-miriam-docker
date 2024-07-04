import React, { useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UserProfile from "./UserProfile";
import TravelRequests from "./TravelRequests";
import TravelMatches from "./TravelMatches";
import TravelRequestForm from "./TravelRequestForm";
import { UserContext } from "../App";
import Users from "./Users";
import Reminders from "../components/Reminders";
import CloseIcon from "@mui/icons-material/Close";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import MyTravels from "../components/MyTravels";
import Logo from '../imgs/Logo.png'; 

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [minimizedReminders, setMinimizedReminders] = useState(false); // State to manage minimized status
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  console.log("user", user); // Debugging: log the user object

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/logout/${user.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUser(undefined); // Reset user
        navigate("/home");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleReminders = () => {
    setMinimizedReminders(!minimizedReminders);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppBar position="fixed" style={{ backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid #ccc" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <img
              src={Logo}
              alt="Darchei Miriam Logo"
              style={{ height: "80px", width: "auto", margin: "auto" }}
            />
          </Typography>
          <div>
            {user && user.isApproved ? (
              <>
                {(user.roleName === "Admin" ||
                  user.roleName === "Volunteer") && (
                  <Button color="inherit" component={Link} to="travelRequests" style={{ color: "#000" }}>
                    בקשות פתוחות
                  </Button>
                )}
                {user.roleName === "Admin" && (
                  <Button color="inherit" component={Link} to="travelMatches" style={{ color: "#000" }}>
                    Travel Matches
                  </Button>
                )}
                {(user.roleName === "Admin" || user.roleName === "Patient") && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="travelRequestForm"
                    style={{ color: "#000" }}
                  >
                    Travel Request Form
                  </Button>
                )}
                {user.roleName === "Admin" && (
                  <Button color="inherit" component={Link} to="users" style={{ color: "#000" }}>
                    Users
                  </Button>
                )}
                <IconButton color="inherit" onClick={handleMenu}>
                  <AccountCircle style={{ color: "#000" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to="profile">
                    Profile
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="myTravels"
                  >
                    My Travels
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login" style={{ color: "#000" }}>
                Log In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "64px",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="travelRequests" element={<TravelRequests />} />
          <Route path="travelMatches" element={<TravelMatches />} />
          <Route path="travelRequestForm" element={<TravelRequestForm />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="myTravels" element={<MyTravels />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Container>
      {user && user.roleName === "Volunteer" ? (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "16px",
            zIndex: 1300,
          }}
        >
          {minimizedReminders ? (
            <IconButton
              onClick={toggleReminders}
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            >
              <DriveEtaIcon />
            </IconButton>
          ) : (
            <div
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                padding: "16px",
                width: "250px",
              }}
            >
              <IconButton
                onClick={toggleReminders}
                style={{ position: "absolute", top: "8px", right: "8px" }}
              >
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
  const { user } = useContext(UserContext);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} textAlign="center">
        <Typography variant="h6">Home</Typography>
        {user && !user.isApproved && (
          <Typography style={{ color: "red" }}>
            Your request to join has been sent for approval. You will be
            notified once it is approved.
          </Typography>
        )}

        <Typography>Welcome to the home page!</Typography>
        {user ? (
          user.isApproved ? (
            <Typography>Welcome back!</Typography>
          ) : null
        ) : (
          <Button variant="contained" onClick={() => navigate("/login")}>
            Log In
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;

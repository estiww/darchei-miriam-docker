import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from '../imgs/Logo.png'; 
import { UserContext } from "../App";

const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isLoginPage = location.pathname.includes("/login");

  return (
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
              {(user.roleName === "Admin" || user.roleName === "Volunteer") && (
                <Button color="inherit" component={Link} to="travelRequests" style={{ color: "#000" }}>
                  בקשות פתוחות
                </Button>
              )}
              {user.roleName === "Admin" && (
                <Button color="inherit" component={Link} to="addUser" style={{ color: "#000" }}>
                   AddUser
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

                <MenuItem onClick={handleClose} component={Link} to="myTravels">
                  My Travels
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {isLoginPage ? (
                <Button color="inherit" component={Link} to="/signup" style={{ color: "#000" }}>
                  Sign Up
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login" style={{ color: "#000" }}>
                  Log In
                </Button>
              )}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;

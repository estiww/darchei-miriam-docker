import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { UserContext } from "../App"; // Assuming UserContext is exported from App.js

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({ ...user });
  console.log(userDetails);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("PUT");
    console.log(userDetails);
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify(userDetails),
        credentials: "include",
      };
      
      const response = await fetch(
        `http://localhost:3000/users/${userDetails.id}`,
        requestOptions
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update user");
      }
    } catch (error) {
      // setError(error.message);
    } finally {
      setUser(userDetails);
      setEditMode(false);
      //האם צריך פה קריאת שרת
      // fetchTravelRequests();
    }
    // Here you would typically also send the updated details to your server
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
        {!editMode ? (
          <IconButton onClick={toggleEditMode} style={{ marginLeft: "10px" }}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSubmit} style={{ marginLeft: "10px" }}>
            <SaveIcon />
          </IconButton>
        )}
      </Typography>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={userDetails.lastName}
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={userDetails.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Neighborhood"
                name="neighborhood"
                value={userDetails.neighborhood}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                name="street"
                value={userDetails.street}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="House Number"
                name="houseNumber"
                value={userDetails.houseNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                name="zipCode"
                value={userDetails.zipCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Communication Method"
                name="communicationMethod"
                value={userDetails.communicationMethod}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            {userDetails.role === "Volunteer" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={userDetails.location || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            )}
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
            <Typography variant="h6">First Name</Typography>
            <Typography>{userDetails.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Last Name</Typography>
            <Typography>{userDetails.lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Email</Typography>
            <Typography>{userDetails.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography>{userDetails.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">City</Typography>
            <Typography>{userDetails.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Neighborhood</Typography>
            <Typography>{userDetails.neighborhood}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Street</Typography>
            <Typography>{userDetails.street}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">House Number</Typography>
            <Typography>{userDetails.houseNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Zip Code</Typography>
            <Typography>{userDetails.zipCode}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Communication Method</Typography>
            <Typography>{userDetails.communicationMethod}</Typography>
          </Grid>
          {userDetails.role === "Volunteer" && (
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Location</Typography>
              <Typography>{userDetails.location}</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default UserProfile;

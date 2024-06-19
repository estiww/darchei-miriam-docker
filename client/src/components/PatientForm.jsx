import React, { useState } from "react";
import { Button, TextField, Box, Container, Typography } from "@mui/material";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    neighborhood: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would handle form submission, e.g., sending data to the server
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6">Assistance Request</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Address
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="House Number"
          name="houseNumber"
          value={formData.houseNumber}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit Assistance Request
        </Button>
      </Box>
    </Container>
  );
};

export default PatientForm;

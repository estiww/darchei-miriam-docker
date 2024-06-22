import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Container,
  Typography,
} from "@mui/material";

const PatientForm = ({ email, password }) => {
  const [formData, setFormData] = useState({
    roleId: 1,
    id: "",
    firstName: "",
    lastName: "",
    communicationMethod: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: email,
    password: password,
    city: "",
    neighborhood: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const url = `http://localhost:3000/fullRegistration`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        setError("Update successful");
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Clear error message if form is valid
    setError("");
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6">Assistance Request</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
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
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Birth Date"
          name="birthDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.birthDate}
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
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Preferred Communication Method</FormLabel>
          <RadioGroup
            row
            name="communicationMethod"
            value={formData.communicationMethod}
            onChange={handleChange}
          >
            <FormControlLabel value="WhatsApp" control={<Radio />} label="WhatsApp" />
            <FormControlLabel value="Email" control={<Radio />} label="Email" />
            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
          </RadioGroup>
        </FormControl>

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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Assistance Request
        </Button>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PatientForm;

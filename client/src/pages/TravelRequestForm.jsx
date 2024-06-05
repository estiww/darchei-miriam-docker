import React, { useState } from "react";
import { Button, TextField, FormControl, FormControlLabel, Checkbox, Box, Container, Typography } from "@mui/material";

const TravelRequestForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    origin: "",
    travelTime: "",
    travelDate: "",
    destination: "",
    numberOfPassengers: 1,
    isAlone: false,
    frequency: "",
    status: "התקבלה",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6">Travel Request Form</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Patient ID"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Travel Time"
          name="travelTime"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formData.travelTime}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Travel Date"
          name="travelDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.travelDate}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Number of Passengers"
          name="numberOfPassengers"
          type="number"
          value={formData.numberOfPassengers}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isAlone"
              checked={formData.isAlone}
              onChange={handleChange}
            />
          }
          label="Is Alone"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit Travel Request
        </Button>
      </Box>
    </Container>
  );
};

export default TravelRequestForm;

import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  FormGroup,
} from "@mui/material";

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
    travelType: "חד פעמי",
    recurringDays: [],
    recurringDuration: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // בדיקה שמספר הנוסעים הוא 1 או 2 בלבד
    if (name === "numberOfPassengers" && (value !== "1" && value !== "2")) {
      setError("Number of passengers must be 1 or 2");
    } else {
      setError(""); // איפוס השגיאה אם הערך תקין
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDayChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => {
      const recurringDays = checked
        ? [...prevFormData.recurringDays, name]
        : prevFormData.recurringDays.filter((day) => day !== name);

      return { ...prevFormData, recurringDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // בדיקת תאריך ושעה
    const currentDate = new Date();
    const travelDate = new Date(`${formData.travelDate}T${formData.travelTime}`);

    if (travelDate < currentDate) {
      setError("Travel date and time must be in the future");
      return;
    }

    if (formData.travelType === "קבוע" && formData.endDate) {
      const endDate = new Date(formData.endDate);
      if (endDate < currentDate) {
        setError("End date must be in the future");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/travelRequests", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create travel request");
      }

      const data = await response.json();
      console.log("Travel request created successfully:", data);

      // הגדרת מצב הצלחה ואיפוס הטופס
      setIsSubmitted(true);

      // אופציונלי: איפוס הטופס לאחר השליחה המוצלחת
      setFormData({
        patientId: "",
        origin: "",
        travelTime: "",
        travelDate: "",
        destination: "",
        numberOfPassengers: 1,
        isAlone: false,
        frequency: "",
        status: "התקבלה",
        travelType: "חד פעמי",
        recurringDays: [],
        recurringDuration: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error creating travel request:", error.message);
      setError("Failed to create travel request");
    }
  };

  return (
    <Container>
      {isSubmitted ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color="success.main">
            Travel request submitted successfully!
          </Typography>
        </Box>
      ) : (
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
            inputProps={{ min: 1, max: 2 }} // תגבול ל-1 או 2
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="travelType-label">Travel Type</InputLabel>
            <Select
              labelId="travelType-label"
              name="travelType"
              value={formData.travelType}
              onChange={handleChange}
              label="Travel Type"
            >
              <MenuItem value="חד פעמי">חד פעמי</MenuItem>
              <MenuItem value="קבוע">קבוע</MenuItem>
            </Select>
          </FormControl>
          {formData.travelType === "קבוע" && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="recurringDuration-label">Recurring Duration</InputLabel>
                <Select
                  labelId="recurringDuration-label"
                  name="recurringDuration"
                  value={formData.recurringDuration}
                  onChange={handleChange}
                  label="Recurring Duration"
                >
                  <MenuItem value="כל יום">כל יום</MenuItem>
                  <MenuItem value="פעם בשבוע">פעם בשבוע</MenuItem>
                  <MenuItem value="פעם בחודש">פעם בחודש</MenuItem>
                  <MenuItem value="בחירת ימים בשבוע">בחירת ימים בשבוע</MenuItem>
                </Select>
              </FormControl>
              {formData.recurringDuration === "בחירת ימים בשבוע" && (
                <>
                  <Typography variant="subtitle1">Select Days of the Week</Typography>
                  <FormGroup row>
                    {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day) => (
                      <FormControlLabel
                        key={day}
                        control={
                          <Checkbox
                            name={day}
                            checked={formData.recurringDays.includes(day)}
                            onChange={handleDayChange}
                          />
                        }
                        label={day}
                      />
                    ))}
                  </FormGroup>
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={handleChange}
              />
            </>
          )}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Travel Request
          </Button>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default TravelRequestForm;

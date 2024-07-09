import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AsyncSelect from "react-select/async";
import sendRefreshToken from "../components/SendRefreshToken";

const TravelRequestForm = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origin: "",
    originHouseNumber: "",
    destination: "",
    destinationHouseNumber: "",
    usertId: "",
    travelTime: "",
    travelDate: "",
    numberOfPassengers: 1,
    isAlone: false,
    frequency: "",
    status: "התקבלה",
    travelType: "חד פעמי",
    recurringDays: [],
    endDate: "",
  });

  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "numberOfPassengers" && value !== "1" && value !== "2") {
      setError("Number of passengers must be 1 or 2");
    } else {
      setError("");
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

    const currentDate = new Date();
    const travelDate = new Date(
      `${formData.travelDate}T${formData.travelTime}`
    );

    if (travelDate < currentDate) {
      setError("Travel date and time must be in the future");
      return;
    }

    const maxTravelDate = new Date();
    maxTravelDate.setDate(currentDate.getDate() + 7);
    if (travelDate > maxTravelDate) {
      setError("Travel date must be within one week from today");
      return;
    }

    if (formData.travelType === "קבוע" && formData.endDate) {
      const endDate = new Date(formData.endDate);
      if (endDate < travelDate) {
        setError("End date must be later than the travel date");
        return;
      }
    }

    const originFullAddress = `${formData.origin}, ${formData.originHouseNumber}`;
    const destinationFullAddress = `${formData.destination}, ${formData.destinationHouseNumber}`;

    const updatedFormData = {
      ...formData,
      origin: originFullAddress,
      destination: destinationFullAddress,
    };

    try {
      const response = await fetch("http://localhost:3000/travelRequests", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const response = await sendRefreshToken();
          if (response.status === 440) {
            console.log(440);
            throw new Error("440");
          }
        }
      }

      const data = await response.json();
      console.log("Travel request created successfully:", data);

      setIsSubmitted(true);
      setOpenDialog(true);

      setFormData({
        origin: "",
        originHouseNumber: "",
        destination: "",
        destinationHouseNumber: "",
        usertId: "",
        travelTime: "",
        travelDate: "",
        numberOfPassengers: 1,
        isAlone: false,
        frequency: "",
        status: "התקבלה",
        travelType: "חד פעמי",
        recurringDays: [],
        endDate: "",
      });
    } catch (error) {
      setError(error.message);
      if (error.message === "440") {
        navigate("/login");
      }
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    navigate("/home");
  };

  const loadAddressOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}&countrycodes=il&limit=3`
      );
      const data = await response.json();
      console.log("Data from API:", data);
      return data.map((item) => {
        const addressParts = item.display_name.split(",").slice(0, 3);
        // הוסף את מספר הבית לאחר המרכיב הראשון
        if (addressParts.length > 1) {
          addressParts[1] = `${addressParts[1]} ${
            formData.originHouseNumber || formData.destinationHouseNumber
          }`;
        }
        const formattedAddress = addressParts.join(", ");
        console.log("Formatted address:", formattedAddress);
        return {
          value: item.place_id,
          label: formattedAddress,
        };
      });
    } catch (error) {
      console.error("Error fetching address options:", error);
      return [];
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AsyncSelect
                cacheOptions
                loadOptions={loadAddressOptions}
                onChange={(option) =>
                  setFormData((prev) => ({ ...prev, origin: option.label }))
                }
                placeholder="Search for origin address"
                noOptionsMessage={() => "לא נמצאו תוצאות"}
              />
              <TextField
                fullWidth
                label="House Number"
                name="originHouseNumber"
                value={formData.originHouseNumber}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <AsyncSelect
                cacheOptions
                loadOptions={loadAddressOptions}
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    destination: option.label,
                  }))
                }
                placeholder="Search for destination address"
                noOptionsMessage={() => "לא נמצאו תוצאות"}
              />
              <TextField
                fullWidth
                label="House Number"
                name="destinationHouseNumber"
                value={formData.destinationHouseNumber}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
          {user.roleName == "Admin" && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="User Id"
                name="usertId"
                value={formData.usertId}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </Grid>
          )}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Travel Date"
                name="travelDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.travelDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Travel Time"
                name="travelTime"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.travelTime}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Number of Passengers"
                name="numberOfPassengers"
                type="number"
                value={formData.numberOfPassengers}
                onChange={handleChange}
                inputProps={{ min: 1, max: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="travelType-label">Travel Type</InputLabel>
                <Select
                  labelId="travelType-label"
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  label="Travel Type"
                >
                  <MenuItem value="חד פעמי">One-time</MenuItem>
                  <MenuItem value="קבוע">Fixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {formData.travelType === "קבוע" && (
            <>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <>
                    <Typography variant="subtitle2">Select Days</Typography>
                    <FormGroup row>
                      {[
                        "ראשון",
                        "שני",
                        "שלישי",
                        "רביעי",
                        "חמישי",
                        "שישי",
                        "שבת",
                      ].map((day) => (
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
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
            label="Alone"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Request
          </Button>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            Travel request submitted successfully!
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Travel request submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TravelRequestForm;


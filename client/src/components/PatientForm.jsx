import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import sendRefreshToken from "./SendRefreshToken";

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PatientForm = ({ isApproved = false }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  console.log("isApproved");
  console.log(isApproved);
  const [formData, setFormData] = useState({
    roleName: "Patient",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    city: "",
    neighborhood: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    isApproved: isApproved,
    communicationMethod: "",
  });

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("You have entered an invalid email address!");
      return;
    }
    if (!validateBirthDate(formData.birthDate)) {
      setError("You have entered an invalid birthdate!");
      return;
    }
  
    let url;
    if (user.roleName !== "Admin") {
      url = `http://localhost:3000/signup`;
    } else {
      url = `http://localhost:3000/addUser`;
    }
  
    const fetchData = async () => {
      try {
        let response = await fetch(url, requestOptions);
  
        if (!response.ok) {
          if (user.roleName === "Admin" && response.status === 401) {
            console.log('user.roleName === "Admin" && response.status === 401');
            const tokenResponse = await sendRefreshToken();
            if (tokenResponse.status === 440) {
              console.log(440);
              throw new Error("440");
            }
            return fetchData(); // Retry the request after refreshing the token
          }
  
          const data = await response.json();
          throw new Error(data.message);
        }
  
        const data = await response.json();
        if (user.roleName !== "Admin") {
          setUser(data);
        }
        setOpen(true); // Open the dialog upon successful request
      } 
      catch (error) {
        setError(error.message);
        if (error.message === "440") {
          navigate("/login");
        }
      }
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    };
  
    // try {
    //   await fetchData(); // Call fetchData to initiate the request
    // } catch (error) {
    //   setError(error.message);
    // }
    await fetchData();
    
  };
  
  
  const validateEmail = (mailAddress) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailAddress.match(mailformat);
  };

  const validateBirthDate = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    return birthDateObj.setFullYear(birthDateObj.getFullYear() + 18) < today;
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6">Patient Registration</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
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
        </Box>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
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
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
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
        </Box>
       
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">
            Preferred Communication Method
          </FormLabel>
          <RadioGroup
            row
            name="communicationMethod"
            value={formData.communicationMethod}
            onChange={handleChange}
          >
            <FormControlLabel
              value="WhatsApp"
              control={<Radio />}
              label="WhatsApp"
            />
            <FormControlLabel value="Email" control={<Radio />} label="Email" />
            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Address
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
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
            required
            fullWidth
            label="Neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
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
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Patient Request
        </Button>
       
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            Request Successful
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your request has been received and is pending approval.
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

export default PatientForm;


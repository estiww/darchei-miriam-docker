import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import VolunteerForm from "../components/VolunteerForm";
import PatientForm from "../components/PatientForm";
import { useLocation } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";

const Signup = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  const [selectedForm, setSelectedForm] = useState("volunteer");

  const renderForm = () => {
    switch (selectedForm) {
      case "volunteer":
        return <VolunteerForm />;
      case "patient":
        return <PatientForm />;
      default:
        return null;
    }
  };

  return (
    <Container sx={{ marginTop: 8 }}>
      <NavigationMenu />
      <Typography variant="h4" gutterBottom marginTop={20}>
        Choose Request Type
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          onClick={() => setSelectedForm("volunteer")}
          variant="contained"
          sx={{ marginRight: 2 }}
        >
          Volunteer Request
        </Button>
        <Button onClick={() => setSelectedForm("patient")} variant="contained">
          Assistance Request
        </Button>
      </Box>
      <Box>{renderForm()}</Box>
    </Container>
  );
};

export default Signup;

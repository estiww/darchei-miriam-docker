import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import VolunteerForm from "../components/VolunteerForm";
import PatientForm from "../components/PatientForm";
import { useLocation } from "react-router-dom";

const FullRegistration = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  const [selectedForm, setSelectedForm] = useState("volunteer");

  const renderForm = () => {
    switch (selectedForm) {
      case "volunteer":
        return <VolunteerForm email={email} password={password} />;
      case "patient":
        return <PatientForm email={email} password={password} />;
      default:
        return null;
    }
  };

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
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
        <Button
          onClick={() => setSelectedForm("patient")}
          variant="contained"
        >
          Assistance Request
        </Button>
      </Box>
      <Box>
        {renderForm()}
      </Box>
    </Container>
  );
};

export default FullRegistration;

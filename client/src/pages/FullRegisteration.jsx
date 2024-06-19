import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import VolunteerForm from "../components/VolunteerForm";
import PatientForm from "../components/PatientForm";

const FullRegistration = () => {
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
    <Container sx={{ marginTop: 4 }}>
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

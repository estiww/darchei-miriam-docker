import React, { useState } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import VolunteerForm from "../components/VolunteerForm";
import PatientForm from "../components/PatientForm";

const FullRegistration = () => {
  const [selectedForm, setSelectedForm] = useState(null);

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
    <Container>
      <Typography variant="h4" gutterBottom>
        Choose Request Type
      </Typography>
      <Box>
        <Button onClick={() => setSelectedForm("volunteer")} variant="contained" sx={{ m: 1 }}>
          Volunteer Request
        </Button>
        <Button onClick={() => setSelectedForm("patient")} variant="contained" sx={{ m: 1 }}>
          Assistance Request
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        {renderForm()}
      </Box>
    </Container>
  );
};

export default FullRegistration;

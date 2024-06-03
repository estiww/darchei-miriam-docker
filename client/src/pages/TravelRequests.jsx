import React, { useState } from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const mockRequests = [
  {
    TravelRequestId: 1,
    PatientId: 101,
    Origin: 'Tel Aviv',
    TravelTime: '08:00',
    TravelDate: '2024-06-01',
    Destination: 'Jerusalem',
    NumberOfPassengers: 1,
    IsAlone: true,
    Frequency: 'Daily',
    Status: 'התקבלה',
  },
  {
    TravelRequestId: 2,
    PatientId: 102,
    Origin: 'Haifa',
    TravelTime: '09:30',
    TravelDate: '2024-06-02',
    Destination: 'Tel Aviv',
    NumberOfPassengers: 2,
    IsAlone: false,
    Frequency: 'Weekly',
    Status: 'התקבלה',
  },
  {
    TravelRequestId: 3,
    PatientId: 103,
    Origin: 'Eilat',
    TravelTime: '14:00',
    TravelDate: '2024-06-03',
    Destination: 'Beersheba',
    NumberOfPassengers: 3,
    IsAlone: false,
    Frequency: 'Monthly',
    Status: 'התקבלה',
  },
];

const TravelRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewDetails = (id) => {
    const request = requests.find((req) => req.TravelRequestId === id);
    setSelectedRequest(request);
  };

  const handleTakeRequest = (id) => {
    const updatedRequests = requests.filter((req) => req.TravelRequestId !== id);
    setRequests(updatedRequests);
    setSelectedRequest(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Open Travel Requests
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {selectedRequest === null && requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.TravelRequestId}>
              <Button variant="outlined" fullWidth onClick={() => handleViewDetails(request.TravelRequestId)}>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <CalendarTodayIcon /> {`Date: ${request.TravelDate}`}
                  </Grid>
                  <Grid item>
                    <AccessTimeIcon /> {`Time: ${request.TravelTime}`}
                  </Grid>
                  <Grid item>
                    <LocationOnIcon /> {`Origin: ${request.Origin}`}
                  </Grid>
                  <Grid item>
                    <ArrowForwardIcon /> {`Destination: ${request.Destination}`}
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {selectedRequest && (
        <Box mt={4}>
          <Typography variant="h6">Request Details</Typography>
          <Typography>{`ID: ${selectedRequest.TravelRequestId}`}</Typography>
          <Typography>{`Patient ID: ${selectedRequest.PatientId}`}</Typography>
          <Typography>{`Origin: ${selectedRequest.Origin}`}</Typography>
          <Typography>{`Time: ${selectedRequest.TravelTime}`}</Typography>
          <Typography>{`Date: ${selectedRequest.TravelDate}`}</Typography>
          <Typography>{`Destination: ${selectedRequest.Destination}`}</Typography>
          <Typography>{`Number of Passengers: ${selectedRequest.NumberOfPassengers}`}</Typography>
          <Typography>{`Is Alone: ${selectedRequest.IsAlone}`}</Typography>
          <Typography>{`Frequency: ${selectedRequest.Frequency}`}</Typography>
          <Typography>{`Status: ${selectedRequest.Status}`}</Typography>
          <Button variant="contained" color="primary" onClick={() => handleTakeRequest(selectedRequest.TravelRequestId)}>
            Take Request
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default TravelRequests;

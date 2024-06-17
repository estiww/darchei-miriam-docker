import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container } from "@mui/material";

const TravelRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState("");

// const sendRefreshToken = async () => {
//     try {
//       console.log('sendRefreshToken');

//       const response = await fetch('http://localhost:3000/refreshTokenRoute', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to refresh token');
//       }

//       const data = await response.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };  
 
  const fetchTravelRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/travelRequests", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        // if (response.status === 401) {
        //   console.log('Refreshing token and retrying...');
        //   // await sendRefreshToken();
        //   return fetchTravelRequests(); // Retry fetch after token refresh
        // }

        const data = await response.json();
        throw new Error(data.error);
      }

      if (response.status === 204) {
        throw new Error("No Open Travel Request");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTravelRequests();
  }, []);

  // const handleViewDetails = (id) => {
  //   fetch(`http://localhost:3000/travelRequests/${id}`)
  //     .then(response => response.json())
  //     .then(data => setSelectedRequest(data))
  //     .catch(error => setError(error.ToSring));
  // };

  // const handleTakeRequest = (id) => {
  //   fetch(`http://localhost:3000/take-request/${id}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         setRequests(requests.filter(request => request.TravelRequestId !== id));
  //         setSelectedRequest(null);
  //       } else {
  //         throw new Error('Failed to take request');
  //       }
  //     })
  //     .catch(error => setError(error.message));
  // };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Open Travel Requests
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box>
        {requests.map((request) => (
          <Box key={request.TravelRequestId} mb={2}>
            <Button
              variant="outlined"
              onClick={() => handleViewDetails(request.TravelRequestId)}
            >
              {`Date: ${request.TravelDate}, Time: ${request.TravelTime}, Origin: ${request.Origin}, Destination: ${request.Destination}`}
            </Button>
          </Box>
        ))}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleTakeRequest(selectedRequest.TravelRequestId)}
          >
            Take Request
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default TravelRequests;

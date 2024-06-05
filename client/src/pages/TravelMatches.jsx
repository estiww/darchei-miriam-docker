import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const travelRequests = [
    {
      TravelRequestId: 1,
      Origin: "Tel Aviv",
      Destination: "Jerusalem",
      TravelTime: "09:00",
      TravelDate: "2024-06-15",
      NumberOfPassengers: 2,
    },
    // הוסף נתונים נוספים לפי הצורך
  ];
  
  export const volunteers = [
    {
      VolunteerId: 1,
      FirstName: "John",
      LastName: "Doe",
    },
    // הוסף נתונים נוספים לפי הצורך
  ];
  
  export const travelMatches = [
    {
      TravelMatchId: 1,
      TravelRequestId: 1,
      VolunteerId: 1,
      MatchTime: "08:30",
      MatchDate: "2024-06-15",
      NumberOfPassengers: 2,
    },
    // הוסף נתונים נוספים לפי הצורך
  ];
  
const TravelMatches = () => {
  const getRequestDetails = (requestId) => {
    return travelRequests.find((request) => request.TravelRequestId === requestId);
  };

  const getVolunteerName = (volunteerId) => {
    const volunteer = volunteers.find((vol) => vol.VolunteerId === volunteerId);
    return volunteer ? `${volunteer.FirstName} ${volunteer.LastName}` : "";
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Travel Matches
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Match ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Volunteer</TableCell>
              <TableCell>Match Time</TableCell>
              <TableCell>Match Date</TableCell>
              <TableCell>Number of Passengers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {travelMatches.map((match) => {
              const requestDetails = getRequestDetails(match.TravelRequestId);
              return (
                <TableRow key={match.TravelMatchId}>
                  <TableCell>{match.TravelMatchId}</TableCell>
                  <TableCell>{requestDetails?.Origin}</TableCell>
                  <TableCell>{requestDetails?.Destination}</TableCell>
                  <TableCell>{getVolunteerName(match.VolunteerId)}</TableCell>
                  <TableCell>{match.MatchTime}</TableCell>
                  <TableCell>{match.MatchDate}</TableCell>
                  <TableCell>{match.NumberOfPassengers}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TravelMatches;

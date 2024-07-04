import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MyTravels = () => {
  const [travelRequests, setTravelRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTravelRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/travelMatches/${user.id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setTravelRequests(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching travel requests:', error);
        setTravelRequests([]); // Handle error by setting an empty array
      }
    };

    if (user) {
      fetchTravelRequests();
    }
  }, [user]);

  return (
    <div>
      <Typography variant="h6">My Travel Requests</Typography>
      <List>
        {travelRequests.length > 0 ? (
          travelRequests.map((request) => (
            <ListItem key={request.requestId}>
              <ListItemText
                primary={`From: ${request.Origin} To: ${request.Destination}`}
                secondary={`Date: ${request.TravelDate} Time: ${request.TravelTime} - Passengers: ${request.NumberOfPassengers}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" color="red">No travel requests available.</Typography>
        )}
      </List>
    </div>
  );
};

export default MyTravels;

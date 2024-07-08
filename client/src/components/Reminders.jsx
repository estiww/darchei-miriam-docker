import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import { List, ListItem, ListItemText, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Reminders = () => {
  const [upcomingTravels, setUpcomingTravels] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUpcomingTravels = async () => {
      try {
        const response = await fetch(`http://localhost:3000/travelMatches/upcoming`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data); // Debugging: log the fetched data

        // Check if data is an array before setting it to state
        if (Array.isArray(data)) {
          setUpcomingTravels(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setUpcomingTravels([]); // Set to an empty array to prevent map errors
        }
      } catch (error) {
        console.error('Error fetching upcoming travels:', error);
      }
    };

    if (user) {
      fetchUpcomingTravels();
    }
  }, [user]);

  const handleClose = () => {
    setSelectedTravel(null);
  };

  return (
    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <Typography variant="h6">Upcoming Travels</Typography>
      <List>
        {Array.isArray(upcomingTravels) && upcomingTravels.length > 0 ? (
          upcomingTravels.map((travel) => (
            <ListItem button onClick={() => setSelectedTravel(travel)} key={travel.id}>
              <ListItemText
                primary={`From: ${travel.Origin} To: ${travel.Destination}`}
                secondary={`Date: ${travel.TravelDate} Time: ${travel.TravelTime}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No upcoming travels found.</Typography>
        )}
      </List>

      {selectedTravel && (
        <Dialog open={Boolean(selectedTravel)} onClose={handleClose}>
          <DialogTitle>Travel Details</DialogTitle>
          <DialogContent>
            <Typography>Name: {selectedTravel.PatientFirstName}</Typography>
            <Typography>From: {selectedTravel.Origin}</Typography>
            <Typography>To: {selectedTravel.Destination}</Typography>
            <Typography>Date: {selectedTravel.TravelDate}</Typography>
            <Typography>Time: {selectedTravel.TravelTime}</Typography>
            <Typography>Number of Passengers: {selectedTravel.NumberOfPassengers}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Reminders;

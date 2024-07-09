import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Info as InfoIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Navigation as NavigationIcon,
} from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StyledList = styled(List)(({ theme }) => ({
  overflow: "auto",
  "& .MuiListItem-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

const TravelItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Reminders = () => {
  const [upcomingTravels, setUpcomingTravels] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUpcomingTravels = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/travelMatches/upcoming`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setUpcomingTravels(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setUpcomingTravels([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming travels:", error);
      }
    };

    if (user) {
      fetchUpcomingTravels();
    }
  }, [user]);

  const handleClose = () => {
    setSelectedTravel(null);
  };

  const handleNavigate = (origin, destination, app) => {
    let url;
    if (app === "waze") {
      url = `https://www.waze.com/ul?navigate=yes&ll=${encodeURIComponent(
        origin
      )}&to=${encodeURIComponent(destination)}`;
    } else if (app === "google") {
      url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(destination)}`;
    }
    window.open(url, "_blank");
  };

  return (
    <StyledPaper elevation={3}>
      <Box p={2} bgcolor="primary.main" color="primary.contrastText">
        <Typography variant="h6">תזכורות נסיעות קרובות</Typography>
      </Box>
      <StyledList>
        {upcomingTravels.length > 0 ? (
          upcomingTravels.map((travel) => (
            <TravelItem
              button
              key={travel.id}
              onClick={() => setSelectedTravel(travel)}
            >
              <Box display="flex" alignItems="center" width="100%" mb={1}>
                <LocationIcon color="primary" />
                <Typography variant="subtitle1" ml={1}>
                  {travel.Origin} → {travel.Destination}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" width="100%">
                <TimeIcon color="action" />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  {travel.TravelDate} | {travel.TravelTime}
                </Typography>
                <Box flexGrow={1} />
                <Tooltip title="פרטים נוספים">
                  <IconButton
                    size="small"
                    onClick={() => setSelectedTravel(travel)}
                  >
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </TravelItem>
          ))
        ) : (
          <ListItem>
            <Typography variant="body1">לא נמצאו נסיעות קרובות.</Typography>
          </ListItem>
        )}
      </StyledList>

      <Dialog
        open={Boolean(selectedTravel)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle bgcolor="primary.main" color="primary.contrastText">
          פרטי הנסיעה
        </DialogTitle>
        <DialogContent dividers>
          {selectedTravel && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedTravel.PatientFirstName}
              </Typography>
              <Divider />
              <Box mt={2}>
                <Typography>
                  <strong>מוצא:</strong> {selectedTravel.Origin}
                </Typography>
                <Typography>
                  <strong>יעד:</strong> {selectedTravel.Destination}
                </Typography>
                <Typography>
                  <strong>תאריך:</strong> {selectedTravel.TravelDate}
                </Typography>
                <Typography>
                  <strong>שעה:</strong> {selectedTravel.TravelTime}
                </Typography>
                <Typography>
                  <strong>מספר נוסעים:</strong>{" "}
                  {selectedTravel.NumberOfPassengers}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  ניווט:
                </Typography>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<NavigationIcon />}
                    onClick={() =>
                      handleNavigate(
                        selectedTravel.Origin,
                        selectedTravel.Destination,
                        "waze"
                      )
                    }
                  >
                    Waze
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<NavigationIcon />}
                    onClick={() =>
                      handleNavigate(
                        selectedTravel.Origin,
                        selectedTravel.Destination,
                        "google"
                      )
                    }
                  >
                    Google Maps
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default Reminders;
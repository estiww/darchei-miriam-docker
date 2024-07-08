import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import FlagIcon from "@mui/icons-material/Flag";
import sendRefreshToken from "../components/SendRefreshToken";
import { useNavigate } from "react-router-dom";

const TravelRequests = ({ setMinimizedReminders }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [requestToTake, setRequestToTake] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();

  const fetchTravelRequests = async () => {
    try {
      const response = await fetch(`http://localhost:3000/travelRequests?status=התקבלה`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.log(response.status);
        if (response.status === 401) {
          const response = await sendRefreshToken();
          if (response.status === 440) {
            console.log(440);
            throw new Error("440");
          }
          return fetchTravelRequests();
        }

        const data = await response.json();
        throw new Error(data.message);
      }

      if (response.status === 204) {
        setRequests([]);
        throw new Error("No Open Travel Request");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error.message);
      if (error.message === "440") {
        navigate("/login");
      }
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    return `${hours}:${minutes}`;
  };

  const handleTakeRequest = async (requestId) => {
    setLoading(true);
    setConfirmationMessage("");
    try {
      const response = await fetch(
        `http://localhost:3000/travelRequests/${requestId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to take request");
      }

      await createTravelMatches(requestId);
      setConfirmationMessage("הנסיעה נלקחה תודה רבה!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      fetchTravelRequests();
      setMinimizedReminders(true)
       }
  };

  const createTravelMatches = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/travelMatches/${requestId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create travel matches");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenDialog = (id) => {
    setRequestToTake(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setRequestToTake(null);
    setOpenDialog(false);
    setConfirmationMessage("");
    fetchTravelRequests();
  };

  useEffect(() => {
    let timer;
    if (confirmationMessage) {
      timer = setTimeout(() => {
        handleCloseDialog();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [confirmationMessage]);

  useEffect(() => {
    fetchTravelRequests();
    const interval = setInterval(fetchTravelRequests, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Open Travel Requests
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2} justifyContent="center">
        {requests.map((request) => (
          <Grid item xs={12} sm={6} md={3} key={request.TravelRequestId}>
            <Box
              border={1}
              borderRadius={4}
              p={2}
              height="180px"
              width="180px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="left"
            >
              <Typography variant="body1">
                <EventIcon /> {formatDate(request.TravelDate)} <br />
                <AccessTimeIcon /> {formatTime(request.TravelTime)} <br />
                <PlaceIcon /> {request.Origin} <br />
                <FlagIcon /> {request.Destination}
              </Typography>
              <Box mt={2} width="100%">
                <Button
                  variant="outlined"
                  onClick={() => handleOpenDialog(request.TravelRequestId)}
                  fullWidth
                >
                  לקיחת בקשה
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>אישור לקיחת בקשה</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : confirmationMessage ? (
            <DialogContentText>{confirmationMessage}</DialogContentText>
          ) : (
            <DialogContentText>
              האם אתה בטוח שברצונך לקחת את הבקשה?
            </DialogContentText>
          )}
        </DialogContent>
        {!loading && !confirmationMessage && (
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              ביטול
            </Button>
            <Button
              onClick={() => handleTakeRequest(requestToTake)}
              color="primary"
            >
              אישור
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Container>
  );
};

export default TravelRequests;

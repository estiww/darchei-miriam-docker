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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import FlagIcon from "@mui/icons-material/Flag";
import sendRefreshToken from "../components/SendRefreshToken";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TravelRequests = ({ setMinimizedReminders }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [requestToTake, setRequestToTake] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const navigate = useNavigate();

  const hospitals = [
    "הדסה עין כרם",
    "הדסה הר הצופים",
    "איכילוב",
    "שיבא",
    "רמב\"ם",
    "סורוקה",
    "שערי צדק",
    "קפלן",
    "וולפסון",
    "לניאדו",
    "בילינסון",
    "אסף הרופא",
    "פוריה",
    "הלל יפה",
    "ברזילי",
    "זיו",
    "בית לוינשטיין",
    "משגב לדך",
  ];

  const fetchTravelRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/travelRequests?status=התקבלה`,
        {
          method: "GET",
          credentials: "include",
        }
      );

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
      return dayjs(dateStr).format("DD/MM"); // Format date as day and month
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
      setMinimizedReminders(true);
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

  const getRelevantPart = (address) => {
    for (const hospital of hospitals) {
      if (address.includes(hospital)) {
        return hospital;
      }
    }
    const parts = address.split(",");
    if (parts.length > 2) {
      return parts[1].trim(); // Get the second part
    }
    return address;
  };

  const filteredRequests = requests
    .filter((request) => {
      if (filterType && filterValue) {
        if (filterType === "origin") {
          return getRelevantPart(request.Origin).includes(filterValue);
        } else if (filterType === "destination") {
          return getRelevantPart(request.Destination).includes(filterValue);
        } else if (filterType === "date") {
          return formatDate(request.TravelDate) === filterValue;
        }
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.TravelDate);
      const dateB = new Date(b.TravelDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={10}>
        Open Travel Requests
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mb={5}
      >
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Filter By</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
                setSelectedDate(null);
              }}
            >
              <MenuItem value="origin">מקור</MenuItem>
              <MenuItem value="destination">יעד</MenuItem>
              <MenuItem value="date">תאריך</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          {filterType === "date" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="בחר תאריך"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setFilterValue(dayjs(newValue).format("DD/MM"));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          )}
          {filterType !== "date" && (
            <TextField
              label="Filter Value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              fullWidth
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By Date</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">מהמוקדם למאוחר</MenuItem>
              <MenuItem value="desc">מהמאוחר למוקדם</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {filteredRequests.length === 0 ? (
        <Typography variant="body1" align="center">
          לא נמצאו תוצאות לפי הסינון
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" mb={5}>
          {filteredRequests.map((request) => (
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
                  <PlaceIcon /> {getRelevantPart(request.Origin)} <br />
                  <FlagIcon /> {getRelevantPart(request.Destination)}
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
      )}
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

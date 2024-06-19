const model = require("../models/travelRequestsModels");

const getOpentravelRequests = async (req, res) => {
  try {
    const result = await model.getOpentravelRequests();
    if (result.length > 0) {
      return res.send(result);
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// יצירת בקשת נסיעה חדשה
const createTravelRequest = async (req, res) => {
  try {
    const {
      patientId,
      origin,
      travelTime,
      travelDate,
      destination,
      numberOfPassengers,
      isAlone,
      status,
      travelType,
      recurringDays,
      endDate,
    } = req.body;

    const newTravelRequest = {
      patientId,
      origin,
      travelTime,
      travelDate,
      destination,
      numberOfPassengers,
      isAlone,
      status,
      recurring: travelType === "קבוע",
      recurringDays: travelType === "קבוע" ? recurringDays.join(',') : null,
      recurringEndDate: travelType === "קבוע" ? endDate : null,
    };

    const result = await model.createTravelRequest(newTravelRequest);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getOpentravelRequests, createTravelRequest };

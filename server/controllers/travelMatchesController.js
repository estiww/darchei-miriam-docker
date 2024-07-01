const model = require("../models/travelMatchesModel");
const userModel = require("../models/usersModels");
const TravelMatch = require('../models/travelMatchesModel');
const { sendEmail } = require("../services/sendEmail");

const createTravelMatch = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const volunteerId = await userModel.getVolunteerIdByUserId(req.userId);
    console.log("volunteerId", volunteerId);
    const result = await model.createTravelMatch(volunteerId, requestId);
    if (result) {
      console.log("result");
      await connectionBetweenVolunteerandPatient(result.insertId);
      console.log("resulteeee");

      return res.status(200).json({ insertId: result.insertId });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const connectionBetweenVolunteerandPatient = async (matchId) => {
  try {
    console.log("connectionBetweenVolunteerandPatient");

    const patientDetails = await model.getPatientDetailsByMatchId(matchId);
    console.log("patientDetails");

    const volnteerDetails = await model.getVolunteerDetailsByMatchId(matchId);
    console.log("11");

    const RequestDetails = await model.getRequestDetailsByMatchId(matchId);
    console.log("mail");
    const mailToVolunteer = {
      from: "darcheimiriam2024@gmail.com",
      to: volnteerDetails.Mail,
      subject: "פרטי נסיעה",
      text: `
            שלום ${volnteerDetails.FirstName}
            !תודה על התנדבותך 

            פרטי הנסיעה:
            שם: ${patientDetails.FirstName}
            טלפון: ${patientDetails.Phone}
            מקור:${RequestDetails.Origin}
            יעד:${RequestDetails.Destination}
            זמן נסיעה: ${RequestDetails.TravelTime}
            תאריך נסיעה: ${RequestDetails.TravelDate}
            מספר נוסעים: ${RequestDetails.NumberOfPassengers}
        `,
    };
    await sendEmail(mailToVolunteer);

    const mailToPatient = {
      from: "darcheimiriam2024@gmail.com",
      to: patientDetails.Mail,
      subject: "פרטי נסיעה",
      text: `
              שלום ${patientDetails.FirstName}

              נקבעה לך נסיעה
              פרטי הנסיעה:
              שם: ${volnteerDetails.FirstName}
              טלפון: ${volnteerDetails.Phone}
              מקור:${RequestDetails.Origin}
              יעד:${RequestDetails.Destination}
              זמן נסיעה: ${RequestDetails.TravelTime}
              תאריך נסיעה: ${RequestDetails.TravelDate}
              מספר נוסעים: ${RequestDetails.NumberOfPassengers}

              רפואה שלמה!
          `,
    };
   await sendEmail(mailToPatient);
  } catch (err) {
    throw err;
  }
};

const gettravelMatches = async (req, res) => {
  try {
    const travelMatches = await TravelMatch.getAll();
    res.status(200).json(travelMatches);
  } catch (error) {
    res.status(500).json({ massage: error.message });
  }
};

const getUpcomingTravels = async (req, res) => {
  try {
    const volunteerId = await userModel.getVolunteerIdByUserId(req.userId);
    const upcomingTravels = await TravelMatch.getUpcomingTravelsByVolunteerId(volunteerId);
    res.status(200).json(upcomingTravels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTravelMatch, gettravelMatches,getUpcomingTravels };


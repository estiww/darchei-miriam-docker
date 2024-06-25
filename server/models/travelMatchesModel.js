const pool = require('../db.js');

async function createTravelMatch(volunteerId, requestId) {
    try {
        console.log(`Attempting to create a travel match with volunteerId: ${volunteerId} and requestId: ${requestId}`);
        const sql = `
          INSERT INTO TravelMatchTable (TravelRequestId, VolunteerId, MatchTime, MatchDate, NumberOfPassengers)
          VALUES (?, ?, CURRENT_TIME(), CURRENT_DATE(), 1);
        `;
        const [result] = await pool.query(sql, [requestId, volunteerId]);
        console.log("Insert operation result:", result);
        return result; // Return the result of the insert operation
    } catch (err) {
        console.error("Error occurred while creating travel match:", err);
        throw err;
    }
}
async function getAll(req, res) {
    try {
      const sql = `
        SELECT tm.TravelMatchId, 
               tm.VolunteerId, 
               DATE_FORMAT(tm.MatchTime, '%H:%i') AS MatchTime, 
               DATE_FORMAT(tm.MatchDate, '%Y-%m-%d') AS MatchDate, 
               tm.NumberOfPassengers,
               tr.Origin AS TravelOrigin, 
               DATE_FORMAT(tr.TravelTime, '%H:%i') AS TravelTime,
               tr.Destination AS TravelDestination,
               u.FirstName AS VolunteerFirstName, 
               u.LastName AS VolunteerLastName,
               p.FirstName AS PatientFirstName, 
               p.LastName AS PatientLastName
        FROM TravelMatchTable tm
        INNER JOIN TravelRequestTable tr ON tm.TravelRequestId = tr.TravelRequestId
        INNER JOIN VolunteerTable v ON tm.VolunteerId = v.VolunteerId
        INNER JOIN UserTable u ON v.UserId = u.UserId
        INNER JOIN PatientTable pt ON tr.PatientId = pt.PatientId
        INNER JOIN UserTable p ON pt.UserId = p.UserId;
      `;
      const [rows] = await pool.query(sql);
      return rows;
    } catch (err) {
      console.error("Error occurred while fetching travel matches:", err);
      throw err;
    }
}

module.exports = { createTravelMatch,getAll };

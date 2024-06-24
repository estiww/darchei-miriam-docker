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

module.exports = { createTravelMatch };

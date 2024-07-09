const pool = require('../db.js');

async function getOpentravelRequests(status) {
  try {
    const sql = `
      SELECT TravelRequestId, Origin, TravelTime, TravelDate, Destination 
      FROM TravelRequestTable 
      WHERE Status = ? 
        AND (TravelDate > CURDATE() 
             OR (TravelDate = CURDATE() AND TravelTime > CURTIME()))
    `;
    const [rows] = await pool.query(sql, [status]);
    return rows;
  } catch (err) {
    throw err;
  }
}




async function getPatientIdByUserId(userId) {
  try {
    const patientSql = "SELECT PatientId FROM PatientTable WHERE UserId = ?";
    const [patientResult] = await pool.query(patientSql, [userId]);

    if (patientResult.length === 0) {
      throw new Error("No patient found for the given UserId");
    }

    return patientResult[0].PatientId;
  } catch (err) {
    throw err;
  }
}

async function createTravelRequest(travelRequest) {
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
      recurring,
      recurringDays,
      recurringEndDate,
    } = travelRequest;

    const travelRequestSql =
      "INSERT INTO TravelRequestTable (PatientId, Origin, TravelTime, TravelDate, Destination, NumberOfPassengers, IsAlone, Status, Recurring, RecurringDays, RecurringEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      patientId,
      origin,
      travelTime,
      travelDate,
      destination,
      numberOfPassengers,
      isAlone,
      status,
      recurring,
      recurringDays,
      recurringEndDate,
    ];

    const [result] = await pool.query(travelRequestSql, values);

    return result;
  } catch (err) {
    throw err;
  }
}


async function updateTravelRequestStatus(travelRequestId) {
  try {
    const sql = `
        UPDATE TravelRequestTable
        SET Status = 'נלקחה'
        WHERE TravelRequestId = ?;
    `;
    const [result] = await pool.query(sql, [travelRequestId]);
    console.log(result);
    return result; 
  } catch (err) {
    throw err;
  }
}


module.exports = { getOpentravelRequests, createTravelRequest,updateTravelRequestStatus ,getPatientIdByUserId};

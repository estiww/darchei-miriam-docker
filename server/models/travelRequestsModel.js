const pool = require('../db.js');

async function getOpentravelRequests() {
  try {
    const sql = 'SELECT TravelRequestId, Origin, TravelTime, TravelDate, Destination FROM TravelRequestTable WHERE Status = ?';
    const [rows] = await pool.query(sql, ['התקבלה']);
    return rows;
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

    const sql =
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

    const [result] = await pool.query(sql, values);

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


module.exports = { getOpentravelRequests, createTravelRequest,updateTravelRequestStatus };

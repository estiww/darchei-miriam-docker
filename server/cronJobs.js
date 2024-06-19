const cron = require('node-cron');
const pool = require('./db'); // MySQL connection pool setup

const createFutureRequests = async () => {
    const connection = await pool.getConnection();
  
    try {
      console.log("Starting manual execution: createFutureRequests");
  
      const [recurringRequests] = await connection.query("SELECT * FROM TravelRequestTable WHERE Recurring = TRUE AND RecurringEndDate >= CURDATE()");
      console.log("Recurring requests:", recurringRequests);
  
      const daysOfWeek = {
        "ראשון": 0,
        "שני": 1,
        "שלישי": 2,
        "רביעי": 3,
        "חמישי": 4,
        "שישי": 5,
        "שבת": 6
      };
  
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      console.log("Tomorrow:", tomorrow.toISOString().split('T')[0]);
  
      for (const request of recurringRequests) {
        const recurringDays = request.RecurringDays ? request.RecurringDays.split(',') : []; // Assuming days are stored as a comma-separated string
        const currentDay = tomorrow.getDay();
        const currentDayName = Object.keys(daysOfWeek).find(key => daysOfWeek[key] === currentDay);
  
        console.log(`Checking request for PatientId: ${request.PatientId} on ${tomorrow.toISOString().split('T')[0]}`);
        console.log("Current day:", currentDayName, "Recurring days:", recurringDays);
  
        if (recurringDays.includes(currentDayName)) {
          console.log(`Creating future request for PatientId: ${request.PatientId} on ${tomorrow.toISOString().split('T')[0]}`);
  
          const sql = `INSERT INTO TravelRequestTable 
            (PatientId, Origin, TravelTime, TravelDate, Destination, NumberOfPassengers, IsAlone, Status, Recurring, RecurringDays, RecurringEndDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
          await connection.query(sql, [
            request.PatientId,
            request.Origin,
            request.TravelTime,
            tomorrow.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
            request.Destination,
            request.NumberOfPassengers,
            request.IsAlone,
            'התקבלה',
            request.Recurring,
            request.RecurringDays,
            request.RecurringEndDate
          ]);
  
          console.log(`Future request created successfully for PatientId: ${request.PatientId}`);
        } else {
          console.log(`No matching recurring day for PatientId: ${request.PatientId} on ${tomorrow.toISOString().split('T')[0]}`);
        }
      }
      console.log("Manual execution completed: createFutureRequests");
    } catch (error) {
      console.error("Error during manual execution: ", error.message);
    } finally {
      connection.release();
    }
  };
  
  // For testing purposes, run the function manually
  createFutureRequests();
  
// Schedule the cron job to run every minute
cron.schedule('0 0 * * *', createFutureRequests);

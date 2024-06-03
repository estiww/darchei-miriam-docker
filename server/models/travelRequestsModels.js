const pool = require('../db.js');

async function getOpentravelRequests() {
    try {
        console.log(3);
        const sql = 'SELECT TravelRequestId, Origin, TravelTime, TravelDate, Destination FROM TravelRequestTable WHERE Status = ?';
        const [rows] = await pool.query(sql, ['התקבלה']);
        console.log(rows);
        return rows;
    } catch (err) {
        throw(err);
    }
}

// // נתיב לקבלת פרטים מלאים על בקשה לפי ID
// router.get('/request-details/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const sql = 'SELECT * FROM TravelRequestTable WHERE TravelRequestId = ?';
//         const [rows] = await pool.query(sql, [id]);
//         res.json(rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // נתיב ללקיחת בקשה
// router.post('/take-request/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const sql = 'UPDATE TravelRequestTable SET Status = ? WHERE TravelRequestId = ?';
//         await pool.query(sql, ['נלקחה', id]);
//         res.json({ message: 'Request taken successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;
module.exports = { getOpentravelRequests };
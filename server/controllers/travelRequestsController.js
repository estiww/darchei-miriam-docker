const model = require('../models/travelRequestsModels');

async function getOpentravelRequests(req) {
    try {
        if(req.role==="Patient"){
            throw new Error("Unauthorized access for patient role");
        }
        console.log(2);
        return model.getOpentravelRequests();
    } catch (err) {
        throw err;
    }
}
module.exports = { getOpentravelRequests};
const model = require('../models/travelRequestsModels');

async function getOpentravelRequests() {
    try {
        console.log(2);
        return model.getOpentravelRequests();
    } catch (err) {
        throw err;
    }
}
module.exports = { getOpentravelRequests};
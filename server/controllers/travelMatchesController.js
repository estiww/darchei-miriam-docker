const model = require("../models/travelMatchesModel");
const userModel = require("../models/usersModels");
const TravelMatch = require('../models/travelMatchesModel');

const createTravelMatch = async (req, res) => {
    try {        
        const requestId = req.params.requestId;
        //לבדוק אם קיים כזה מתנדב
        const volunteerId=await userModel.getVolunteerIdByUserId(req.userId);
        console.log("volunteerId",volunteerId);
        const result = await model.createTravelMatch(volunteerId, requestId);
        if (result.length > 0) {
            return res.send(result);
        }
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const gettravelMatches = async (req, res) => {
    try {
        const travelMatches = await TravelMatch.getAll();
        res.status(200).json(travelMatches);
    } catch (error) {
        res.status(500).json({ 'massage': error.message });
    }
};

module.exports = { createTravelMatch,gettravelMatches };


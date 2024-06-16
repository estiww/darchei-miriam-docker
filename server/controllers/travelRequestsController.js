const model = require("../models/travelRequestsModels");

const getOpentravelRequests = async (req, res) => {
  try {
    if (req.role !== "Patient") {
      const result = await model.getOpentravelRequests();
      if (result.length > 0) {
        return res.send(result);
      }
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

  
  
module.exports = { getOpentravelRequests };

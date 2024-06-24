const express = require("express");
const router = express.Router();
const travelRequestsController = require('../controllers/travelRequestsController');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", travelRequestsController.getOpentravelRequests);
router.post("/", travelRequestsController.createTravelRequest);
router.put("/:id", travelRequestsController.requestTaken);

module.exports = router
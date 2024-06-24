const express = require("express");
const router = express.Router();
const travelMatchesController = require('../controllers/travelMatchesController');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.get("/", travelMatchesController.gettravelMatches);
router.post("/:requestId", travelMatchesController.createTravelMatch);

module.exports = router
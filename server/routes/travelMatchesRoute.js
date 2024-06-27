const express = require("express");
const router = express.Router();
const travelMatchesController = require('../controllers/travelMatchesController');
const verifyPermissions = require('../middleware/verifyPermissions');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", travelMatchesController.gettravelMatches);
router.post("/:requestId",verifyPermissions(["Volunteer"]),travelMatchesController.createTravelMatch);

module.exports = router
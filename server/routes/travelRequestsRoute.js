const express = require("express");
const router = express.Router();
const travelRequestsController = require('../controllers/travelRequestsController');
const verifyJWT=require('../middleware/verifyJWT')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", travelRequestsController.getOpentravelRequests);
router.post("/", travelRequestsController.createTravelRequest);

module.exports = router
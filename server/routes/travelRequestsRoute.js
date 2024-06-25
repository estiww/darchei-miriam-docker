const express = require("express");
const router = express.Router();
const travelRequestsController = require('../controllers/travelRequestsController');
const verifyPermissions = require('../middleware/verifyPermissions');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/",verifyPermissions([2,3]), travelRequestsController.getOpentravelRequests);
router.post("/",verifyPermissions([1,3]), travelRequestsController.createTravelRequest);
router.put("/:id",verifyPermissions([2,3]),travelRequestsController.requestTaken);

module.exports = router
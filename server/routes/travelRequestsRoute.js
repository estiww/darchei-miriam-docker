const express = require("express");
const router = express.Router();
const travelRequestsController = require('../controllers/travelRequestsController');
const verifyJWT=require('../middleware/verifyJWT')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", verifyJWT, travelRequestsController.getOpentravelRequests);

module.exports = router
const express = require("express");
const router = express.Router();
const userscontroller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/",userscontroller.authenticate);

module.exports = router;

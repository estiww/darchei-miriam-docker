const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAll);
router.patch("/:id",usersController.updateIsApproved);
module.exports = router;
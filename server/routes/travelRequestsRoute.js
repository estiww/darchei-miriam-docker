const express = require("express");
const router = express.Router();
const travelRequestscontroller = require('../controllers/travelRequestsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        console.log(1);
        const result = await travelRequestscontroller.getOpentravelRequests(req);
        if (result.length>0) {
            console.log(204)
            return res.send(result);
            
        }
        return res.status(204).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/", async (req, res) => {
    if (req.query.userId) {
        const todos = await controller.getByUserid(req.query.userId);
        res.send(todos);
    } else{
        return res.status(400).json({ error: "Missing required fields" });
    }})


module.exports = router
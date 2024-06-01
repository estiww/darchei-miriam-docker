const express = require("express");
const router = express.Router();
const userscontroller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await userscontroller.authenticate(email,password);
        if (result.length > 0) {
            res.send(user);
        }
        return res.status(403).json({ error: "Incorrect password or username" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
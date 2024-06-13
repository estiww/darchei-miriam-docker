const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("verifyJWT")
    //זה טוב לשיטה עם לוקל סטורז
    // const authHeader = req.headers['authorization'];
    //פשוט לוקח את העוגיה
    const cookieToken = req.cookies.accessToken;
    console.log(cookieToken); 
    //אם אין לך טוקן גישה תחזיר 
    if (!cookieToken) return res.sendStatus(401);
     jwt.verify(
        cookieToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.role = decoded.role;
            console.log(444)
            console.log(req.role)
            return next();
        }
    );
}

module.exports = verifyJWT
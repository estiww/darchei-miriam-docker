const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    // console.log(123)
    // // const authHeader = req.headers['authorization'];
    // const cookieToken = req.cookies.accessToken;
    // console.log(cookieToken); // Bearer token

    // if (!cookieToken) return res.sendStatus(401);
    // // console.log(cookieToken); // Bearer token
    // // const token = cookieToken.split(' ')[1];
    // console.log(cookieToken); // Bearer token
    //  jwt.verify(
    //     cookieToken,
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if (err) return res.sendStatus(403); //invalid token
    //         req.role = decoded.role;
    //         console.log(444)
    //         console.log(req.role)
    //         return next();
    //     }
    // );
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );

}

module.exports = verifyJWT

    


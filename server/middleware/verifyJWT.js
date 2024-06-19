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
            req.roleId = decoded.roleId;
            req.isAprroved = decoded.isAprroved;
            console.log(444)
            console.log(req.roleId)
            return next();
        }
    );
}

module.exports = verifyJWT

// const verifyJWT = async (req, res, next) => {
//     console.log("verifyJWT");

//     // Extract the access token from cookies
//     let cookieToken = req.cookies.accessToken;
//     console.log(cookieToken);
//     console.log(next.value);

//     if (!cookieToken) {
//         try {
//             console.log('Attempting to refresh token');

//             const response = await controler.handleRefreshToken(req, res);
//             console.log(response)
//             console.log(333)

//             // if (!response.ok) {
//             //     return res.sendStatus(401);
//             //     // Failed to refresh token
//             // }
//             console.log('666');
//             cookieToken = res.cookies.accessToken;
//         } catch (error) {
//             return res.sendStatus(401); // Failed to refresh token
//         }
//     }
//     console.log('888');

//     // Verify the existing or newly refreshed access token
//     jwt.verify(
//         cookieToken,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403); // Invalid token
//             req.roleId = decoded.roleId;
//             req.isApproved = decoded.isApproved;
//             console.log(444);
//             console.log(req.roleId);
//             return next();
//         }
//     );
// };

// module.exports = verifyJWT;


// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const sendRefreshToken = async () => {
//     try {
//         console.log('sendRefreshToken');

//         const response = await fetch('http://localhost:3000/refreshTokenRoute', {
//             method: 'GET',
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             throw new Error('Failed to refresh token');
//         }

//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const verifyJWT = async (req, res, next) => {
//     console.log("verifyJWT");

//     // Extract the access token from cookies
//     const cookieToken = req.cookies.accessToken;
//     console.log(cookieToken);

//     if (!cookieToken) {
//         // If there is no access token, try to refresh it
//         try {
//             const data = await sendRefreshToken();

//             // Set the new access token in cookies
//             res.cookie('accessToken', data.accessToken, { httpOnly: true, secure: true });

//             // Verify the new access token
//             jwt.verify(
//                 data.accessToken,
//                 process.env.ACCESS_TOKEN_SECRET,
//                 (err, decoded) => {
//                     if (err) return res.sendStatus(403); // invalid token
//                     req.roleId = decoded.roleId;
//                     req.isApproved = decoded.isApproved;
//                     console.log(444);
//                     console.log(req.roleId);
//                     return next();
//                 }
//             );
//         } catch (error) {
//             return res.sendStatus(401); // Failed to refresh token
//         }
//     } else {
//         // Verify the existing access token
//         jwt.verify(
//             cookieToken,
//             process.env.ACCESS_TOKEN_SECRET,
//             (err, decoded) => {
//                 if (err) {
//                     // If token is invalid, try to refresh it
//                     sendRefreshToken()
//                         .then(data => {
//                             // Set the new access token in cookies
//                             res.cookie('accessToken', data.accessToken, { httpOnly: true, secure: true });

//                             // Verify the new access token
//                             jwt.verify(
//                                 data.accessToken,
//                                 process.env.ACCESS_TOKEN_SECRET,
//                                 (err, decoded) => {
//                                     if (err) return res.sendStatus(403); // invalid token
//                                     req.roleId = decoded.roleId;
//                                     req.isApproved = decoded.isApproved;
//                                     console.log(444);
//                                     console.log(req.roleId);
//                                     return next();
//                                 }
//                             );
//                         })
//                         .catch(err => {
//                             return res.sendStatus(401); // Failed to refresh token
//                         });
//                 } else {
//                     req.roleId = decoded.roleId;
//                     req.isApproved = decoded.isApproved;
//                     console.log(444);
//                     console.log(req.roleId);
//                     return next();
//                 }
//             }
//         );
//     }
// };

// module.exports = verifyJWT;


//מקורי!!!!
//const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyJWT = (req, res, next) => {
//     console.log("verifyJWT")
//     //זה טוב לשיטה עם לוקל סטורז
//     // const authHeader = req.headers['authorization'];
//     //פשוט לוקח את העוגיה
//     const cookieToken = req.cookies.accessToken;
//     console.log(cookieToken); 
//     //אם אין לך טוקן גישה תחזיר 
//     if (!cookieToken) return res.sendStatus(401);
//      jwt.verify(
//         cookieToken,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403); //invalid token
//             req.roleId = decoded.roleId;
//             req.isAprroved = decoded.isAprroved;
//             console.log(444)
//             console.log(req.roleId)
//             return next();
//         }
//     );
// }

// module.exports = verifyJWT
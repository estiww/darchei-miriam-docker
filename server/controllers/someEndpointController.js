const jwt = require("jsonwebtoken");
require("dotenv").config();
const model = require("../models/usersModels");
const {
  generateTokens,
  setTokensAsCookies,
} = require("../controllers/usersController");

const someEndpoint = async (req, res) => {
  console.log("someEndpoint11111111111111111111111111111111");

  const cookies = req.cookies;
  //אם אין רפרש-בצד שרת תוציא ללוג אין
  if (!cookies?.refreshToken) return res.sendStatus(440);
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken");
  console.log(refreshToken);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    if (err) return res.sendStatus(403);

    req.userId = decoded.userId;
    req.email = decoded.email;
    req.roleName = decoded.roleName;
    req.isApproved = decoded.isApproved;
    console.log("req.userId");
    console.log(req.userId);
    console.log("req.email");
    console.log(req.email);
    console.log("req.roleName");
    console.log(req.roleName);
    console.log("req.isApproved");
    console.log(req.isApproved);
  });
  const user = await model.getUserByEmail(req.email);
//   const tokens = generateTokens(user);
//   await model.upsertRefreshToken(user.UserId, tokens.refreshToken);
//   setTokensAsCookies(res, tokens);
  console.log("222222222222222222222222222222222222222222");
  console.log({
    id: user.UserId,
    email: user.Mail,
    firstName: user.FirstName,
    lastName: user.LastName,
    city: user.City,
    neighborhood: user.Neighborhood,
    street: user.Street,
    houseNumber: user.HouseNumber,
    zipCode: user.ZipCode,
    communicationMethod: user.CommunicationMethod,
    phone: user.Phone,
    roleName: user.RoleName,
    isApproved: user.IsApproved,
  });
   return res.status(200).json({
    id: user.UserId,
    email: user.Mail,
    firstName: user.FirstName,
    lastName: user.LastName,
    city: user.City,
    neighborhood: user.Neighborhood,
    street: user.Street,
    houseNumber: user.HouseNumber,
    zipCode: user.ZipCode,
    communicationMethod: user.CommunicationMethod,
    phone: user.Phone,
    roleName: user.RoleName,
    isApproved: user.IsApproved,
  });
};
module.exports = {
  someEndpoint,
};

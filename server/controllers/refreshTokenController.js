const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  console.log("handleRefreshToken");

  const cookies = req.cookies;
  //אם אין רפרש-בצד שרת תוציא ללוג אין
  if (!cookies?.refreshToken) return res.sendStatus(440);

  const refreshToken = cookies.refreshToken;
  console.log("refreshToken");
  console.log(refreshToken);

  
  //יש פה בדיקה האם קיים אדם שזה הרפרש טוקן שלו
  //צריך במידה והאתר פתוח יותר זמן משהות הרפרש טוקן ואז כבר לא קיים משתמש מחובר
  // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  // if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    if (err) return res.sendStatus(403);

    req.userId = decoded.userId;
    req.email = decoded.email;
    req.roleName = decoded.roleName;
    req.isApproved = decoded.isApproved;
    console.log("req.userId")
    console.log(req.userId)
    console.log("req.email")
    console.log(req.email)
    console.log("req.roleName")
    console.log(req.roleName)
    console.log("req.isApproved")
    console.log(req.isApproved)
    const accessToken = jwt.sign(
      {
        userId: req.userId,
        email: req.email,
        roleName: req.roleName,
        isApproved: req.isApproved,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 5 * 60 * 1000,
    });
    console.log("ששששששששששש")
    console.log(req.userId)

    res.json(req.userId);
  });
};

module.exports = { handleRefreshToken };

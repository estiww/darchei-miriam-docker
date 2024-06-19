const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require('./cronJobs');

const app = express();


const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const refreshTokenRoute = require('./routes/refreshTokenRoute');
const travelRequestsRoute = require('./routes/travelRequestsRoute');
const logger=require('./middleware/logger')
const verifyJWT=require('./middleware/verifyJWT')
const logoutRoute = require("./routes/logoutRoute");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(logger);

app.use("/logout", logoutRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/refreshTokenRoute', refreshTokenRoute);
app.use('/fullRegistration', signupRoute);

//מה שכתוב מפה ואילך יעבור במידל וור
// app.use(verifyJWT);

app.use("/travelRequests", verifyJWT, travelRequestsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();


const loginRoute = require('./routes/loginRoute');
const travelRequestsRoute = require('./routes/travelRequestsRoute');
const logger=require('./middleware/logger')
const verifyJWT=require('./middleware/verifyJWT')

// const signupRoute = require('./routes/signupRoute');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(logger);


app.use('/login', loginRoute);
// app.use('/signup', signupRoute);
//מה שכתוב מפה ואילך יעבור במידל וור
// app.use(verifyJWT);

app.use('/travelRequests',travelRequestsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

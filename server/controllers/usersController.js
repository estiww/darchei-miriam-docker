const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const model = require("../models/usersModels");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const foundUser = await model.getUserByEmail(email);
    console.log(foundUser);
    if (!foundUser)
      return res
        .status(401)
        .json({ message: "Incorrect password or username" }); //Unauthorized
    // evaluate password
    console.log(await bcrypt.hash(password, 10));
    const match = await bcrypt.compare(password, foundUser.PasswordValue);
    if (match) {
      // create JWTs
      return createJWTs(req, res, foundUser);
    } else {
      return res
        .status(401)
        .json({ message: "Incorrect password or username" });
      // res.sendStatus(401);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

async function signup(req, res) {
  try {
    console.log(1222);
    const {
      roleName,
      firstName,
      lastName,
      communicationMethod,
      gender,
      birthDate,
      phone,
      email,
      password,
      city,
      neighborhood,
      street,
      houseNumber,
      zipCode,
      location = null,
    } = req.body;
    //להחליט איזה שדות הם שדות חובה
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await model.getUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user into database
    const result = await model.signup(
      roleName,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      email,
      hashedPassword,
      city,
      neighborhood,
      street,
      houseNumber,
      zipCode,
      communicationMethod
    );
    console.log("result.insertId", result.insertId);

    if (result) {
      const newUser = {
        UserId: result.insertId,
        Mail: email,
        RoleName: roleName,
        IsApproved: false,
      };
      console.log("RoleName", roleName);

      if (roleName === "Patient") {
        await model.createPatient(result.insertId);
      }
      if (roleName === "Volunteer") {
        await model.createVolunteer(result.insertId, location);
      }
      return createJWTs(req, res, newUser);
    }
    return res.status(500).json({ error: "Failed to create user" });
  } catch (err) {
    console.log(2);

    res.status(500).json({ error: err.message });
  }
}

const createJWTs = async (req, res, user) => {
  console.log("createJWTs");
  const accessToken = jwt.sign(
    {
      userId: user.UserId,
      email: user.Mail,
      roleName: user.RoleName,
      isApproved: user.IsApproved,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    {
      userId: user.UserId,
      email: user.Mail,
      roleName: user.RoleName,
      isApproved: user.IsApproved,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  console.log(user.UserId);
  console.log(refreshToken);
  // Saving refreshToken with current user
  // await model.refreshToken(user.UserId, refreshToken);

  //שמירת אקססטוקן בתור קוקי
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 5 * 60 * 1000,
  });

  //פה נוצר הקוקי בדפדפן
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  //מחזירה לצד שרת פרטים על מנת לשמור משתמש נוכחי
  res.json({ email: user.Mail, role: user.RoleName });
};

//עבור עדכון פרופיל
async function updateUserDetails(req, res) {
  console.log("updateUserDetails");
  const {
    roleName,
    id,
    firstName,
    lastName,
    communicationMethod,
    gender,
    birthDate,
    phone,
    email,
    city,
    neighborhood,
    street,
    houseNumber,
    zipCode,
    location = null,
  } = req.body;
  //לבדוק את העניין של תז כבר קיים במערכת
  try {
    // Update user details in UserTable
    console.log(email);
    await model.updateUserByEmail(
      roleName,
      id,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      email,
      city,
      neighborhood,
      street,
      houseNumber,
      zipCode,
      communicationMethod
    );

    // If patient, add to PatientTable
    // Assuming the role is hardcoded or passed through req.body
    if (roleName === "Patient") {
      await model.createPatient(id);
    }
    if (roleName === "Volunteer") {
      await model.createVolunteer(id, location);
    }

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.log(3);

    res.status(500).json({ message: error.message });
  }
}

// async function update(id, username, email, phone, street, city) {
//   try {
//     return model.updateUser(id, username, email, phone, street, city);
//   } catch (err) {
//     throw err;
//   }
// }

async function deleteUser(id) {
  try {
    return model.deleteUser(id);
  } catch (err) {
    throw err;
  }
}

async function getAll(req, res) {
  try {
    const users = await model.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ massage: error.message });
  }
}
async function updateIsApproved(req, res) {
  try {
    console.log(req.params.id,"DDD",req.body.isApproved)
    const result = await model.updateIsApproved(req.params.id,req.body.isApproved);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ massage: error.message });
  }
}

async function getById(id) {
  try {
    return model.getUser(id);
  } catch (err) {
    throw err;
  }
}

async function getByUsername(username) {
  try {
    return model.getByUsername(username);
  } catch (err) {
    throw err;
  }
}
module.exports = {
  getAll,
  getById,
  deleteUser,
  getByUsername,
  login,
  signup,
  updateUserDetails,
  updateIsApproved,
};

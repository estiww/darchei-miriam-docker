const model = require("../models/usersModels");
const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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
    console.log(1)
    const {
      roleId,
      id,
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
      roleId,
      id,
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

    if (result) {
      const newUser = {
        Mail: email,
        RoleId: null,
        isAprroved: false,
      };

      if (roleId === 1) {
        await model.createPatient(id);
      }
      if (roleId === 2) {
        await model.createVolunteer(id, location);
      }
      return createJWTs(req, res, newUser);
    }
    return res.status(500).json({ error: "Failed to create user" });
  } catch (err) {
    console.log(2)

    res.status(500).json({ error: err.message });
  }
}

const createJWTs = async (req, res, user) => {
  const accessToken = jwt.sign(
    {
      email: user.Mail,
      roleId: user.RoleId,
      isAprroved: user.IsAprroved,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    {
      email: user.Mail,
      roleId: user.RoleId,
      isAprroved: user.IsAprroved,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  console.log(refreshToken);
  // Saving refreshToken with current user
  // await model.refreshToken(user.UserId, refreshToken);

  //שמירת אקססטוקן בתור קוקי
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 30 * 1000,
  });

  //פה נוצר הקוקי בדפדפן
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  //מחזירה לצד שרת פרטים על מנת לשמור משתמש נוכחי
  res.json({ email: user.Mail, role: user.RoleId });
};
//עבור עדכון פרופיל
async function updateUserDetails(req, res) {
  console.log("updateUserDetails");
  const {
    roleId,
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
        roleId,
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
      if (roleId === 1) {
        await model.createPatient(id);
      }
      if (roleId === 2) {
        await model.createVolunteer(id, location);
      }

      res.json({ message: "User details updated successfully" });
    
  } catch (error) {
    console.log(3)

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

async function getAll() {
  try {
    return model.getUsers();
  } catch (err) {
    throw err;
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
};

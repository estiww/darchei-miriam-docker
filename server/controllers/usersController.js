const model = require("../models/usersModels");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // { error: "Missing required fields" }
    // { 'message': 'Username and password are required.' }
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const foundUser = await model.getUserByEmail(email);
    console.log(foundUser);
    if (!foundUser) return res.status(401)
      .json({ message: "Incorrect password or username" }); //Unauthorized
    // evaluate password
    console.log(await bcrypt.hash(password, 10));
    const match = await bcrypt.compare(password, foundUser.PasswordValue);
    console.log(match);

    if (match) {
      // create JWTs
      return createJWTs(req, res, foundUser)
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
    const { email, password } = req.body;
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
    console.log(4);
    // Insert user into database
    const result = await model.signup(email, hashedPassword);

    if (result) {
      const newUser = {
        Mail: email,
        RoleId: null,
        isAprroved: false,
      }
      return createJWTs(req, res,newUser)
    }
    return res.status(500).json({ error: "Failed to create user" });
  } catch (err) {
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

}

async function create(username, email, phone, street, city, password) {
  try {
    return model.createUser(username, email, phone, street, city, password);
  } catch (err) {
    throw err;
  }
}

async function update(id, username, email, phone, street, city) {
  try {
    return model.updateUser(id, username, email, phone, street, city);
  } catch (err) {
    throw err;
  }
}

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
  create,
  getAll,
  getById,
  deleteUser,
  update,
  getByUsername,
  login,
  signup,
};

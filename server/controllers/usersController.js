const model = require("../models/usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

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

// async function authenticate(email, password) {
//     try {
//         const encryptedPassword = await bcrypt.hash(password, 10);
//         return model.authenticate(email, password);

//     } catch (err) {
//         throw err;
//     }
// }

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    // { error: "Missing required fields" }
    // { 'message': 'Username and password are required.' }
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    const foundUser = await model.getUserByEmail(email);
    console.log(123);
    console.log(foundUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    console.log(await bcrypt.hash(password, 10));
    const match = await bcrypt.compare(password, foundUser.PasswordValue);
    console.log(match);

    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { id: foundUser.UserId, role: foundUser.RoleName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { id: foundUser.UserId, role: foundUser.RoleName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      console.log(refreshToken);
      // Saving refreshToken with current user
      await model.refreshToken(foundUser.UserId, refreshToken);
      // res.cookie("accessToken", accessToken, {
      //   httpOnly: true,
      //   sameSite: "None",
      //   secure: true,
      //   maxAge: 5 * 60 * 1000,
      // });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
      // res.json({ email: foundUser.mail ,
      //     role:foundUser.rolename
      // });
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

module.exports = { authenticate };

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
  authenticate,
};

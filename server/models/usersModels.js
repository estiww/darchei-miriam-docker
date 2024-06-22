const pool = require("../db.js");

// async function getUsers() {
//     try {
//         const sql = 'SELECT users.*, addresses.street, addresses.city FROM users INNER JOIN addresses ON users.address_id = addresses.id';
//         const [rows, fields] = await pool.query(sql);
//         console.log(rows);
//         return rows;
//     } catch (err) {
//         console.log(err);
//     }
// }

// async function getUser(id) {
//     try {
//         const sql = 'SELECT users.*, addresses.street, addresses.city FROM users INNER JOIN addresses ON users.address_id = addresses.id WHERE users.id = ?';
//         const [result] = await pool.query(sql, [id]);
//         return result[0];
//     } catch (err) {
//         console.log(err);
//     }
// }

async function isUserExists(mail) {
    try {
        const sql = 'SELECT EXISTS(SELECT 1 FROM UserTable WHERE Mail = ?) as userExists';
        const [rows] = await pool.query(sql, [mail]);
        const userExists = rows[0].userExists === 1; // Convert 1 or 0 to true or false
        console.log('User exists:', userExists);
        return userExists;
    } catch (err) {
        throw new Error('Error checking user existence:', err);
    }
}


async function signup(email, hashedPassword) {
  try {
    console.log(5);

    // Insert password into PasswordTable
    const insertPasswordSql =
      "INSERT INTO PasswordTable (PasswordValue) VALUES (?)";
    const [passwordResult] = await pool.query(insertPasswordSql, [
      hashedPassword,
    ]);
    const passwordId = passwordResult.insertId;
    console.log(passwordId);

    // Insert user into UserTable
    const insertUserSql = `
        INSERT INTO UserTable (PasswordId, Mail, FirstName, LastName, AddressId, Phone, Gender, BirthDate, RoleId, IsApproved) 
        VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE)`;
    const [userResult] = await pool.query(insertUserSql, [passwordId, email]);
    console.log(userResult);

    return userResult;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const sql = `
        SELECT 
            UserTable.UserId,
            UserTable.Mail,
            UserTable.IsApproved,
            PasswordTable.PasswordValue,
            UserTable.RoleId
        FROM UserTable
        INNER JOIN PasswordTable ON UserTable.PasswordId = PasswordTable.PasswordId
        WHERE UserTable.Mail = ?;
        `;
    const [result] = await pool.query(sql, [email]);
    console.log(result);
    return result[0]; // Assuming the email is unique, return the first (and only) user
  } catch (err) {
    throw err;
  }
}

async function updateUserByEmail(
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
) {
  try {
    console.log( roleId,
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
        communicationMethod);
    const getUserSql = `
          SELECT AddressId
          FROM UserTable
          WHERE Mail = ?
        `;
    let [addressId] = await pool.query(getUserSql, [email]);
    console.log(addressId[0].AddressId);
    addressId=addressId[0].AddressId
    if (addressId) {
      // עדכון פרטי הכתובת הקיימת
      const updateAddressSql = `
            UPDATE AddressTable
            SET City = ?, Neighborhood = ?, Street = ?, HouseNumber = ?, ZipCode = ?
            WHERE AddressId = ?
          `;
          console.log(addressId[0].AddressId)
          
      await pool.query(updateAddressSql, [
        city,
        neighborhood,
        street,
        houseNumber,
        zipCode,
        addressId
      ]);
    } else {
      // יצירת שורה חדשה בטבלת הכתובות
      const insertAddressSql = `
            INSERT INTO AddressTable (City, Neighborhood, Street, HouseNumber, ZipCode)
            VALUES (?, ?, ?, ?, ?)
          `;
      const [result] = await pool.query(insertAddressSql, [
        city,
        neighborhood,
        street,
        houseNumber,
        zipCode,
      ]);
      console.log(result) 

      addressId = result.insertId;
    }
    console.log("addressId") 
     console.log(addressId) 
    
    // עדכון פרטי המשתמש
    const updateUserSql = `
          UPDATE UserTable
          SET UserId = ?, FirstName = ?, LastName = ?, Gender = ?, BirthDate = ?, Phone = ?, CommunicationMethod = ?, RoleId = ?, AddressId = ?
          WHERE Mail = ?
        `;
   const[result]= await pool.query(updateUserSql, [
      id,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      communicationMethod,
      roleId,
      addressId,
      email
    ]);
    console.log(result)
    return true; // אם העדכון הצליח
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createPatient(id) {
  try {
    const sql = `
          INSERT INTO PatientTable (UserId)
          VALUES (?)
        `;
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw error;
  }
}
async function createVolunteer(id,location) {
  try {
    const sql = `
          INSERT INTO VolunteerTable (UserId,Location)
          VALUES (? ,?)
        `;
    const [result] = await pool.query(sql, [id,location]);
    return result;
  } catch (error) {
    throw error;
  }
}

// async function refreshToken(userId, refreshToken) {
//     try {
//         const updateSql = 'UPDATE RefreshTokenTable SET RefreshToken = ? WHERE UserId = ?';
//         const [result] = await pool.query(updateSql, [refreshToken, userId]);
//         // אם אף שורה לא עודכנה, מכניסים רשומה חדשה
//         if (result.affectedRows === 0) {
//             const insertSql = 'INSERT INTO RefreshTokenTable (UserId, RefreshToken) VALUES (?, ?)';
//             const [insertResult] = await pool.query(insertSql, [userId, refreshToken]);
//             console.log('Refresh token inserted:', insertResult);
//         } else {
//             console.log('Refresh token updated:', result);
//         }
//     } catch (err) {
//         throw err;
//     }
// }

// async function createUser(username, email, phone, street, city, password) {
//     try {
//         // Insert into addresses table
//         const addressSql = 'INSERT INTO addresses (`street`, `city`) VALUES (?, ?)';
//         const addressResult = await pool.query(addressSql, [street, city]);
//         const addressId = addressResult[0].insertId;

//         // Insert into passwords table
//         const passwordSql = 'INSERT INTO passwords (`password1`) VALUES (?)';
//         const passwordResult = await pool.query(passwordSql, [password]);
//         const passwordId = passwordResult[0].insertId;

//         // Insert into users table with foreign keys
//         const userSql = 'INSERT INTO users (`username`, `email`, `phone`, `address_id`, `password_id`) VALUES (?, ?, ?, ?, ?)';
//         const userResult = await pool.query(userSql, [username, email, phone, addressId, passwordId]);

//         return userResult[0];
//     } catch (err) {
//         console.log(err);
//     }
// }

// async function deleteUser(id) {
//     try {
//         // Get address_id and password_id before deleting the user
//         const sqlGetIds = 'SELECT address_id, password_id FROM users WHERE id = ?';
//         const [result] = await pool.query(sqlGetIds, [id]);
//         const { address_id, password_id } = result[0];

//         // Delete the user
//         const sqlDeleteUser = 'DELETE FROM users WHERE id = ?';
//         await pool.query(sqlDeleteUser, [id]);

//         // Delete the associated address and password
//         const sqlDeleteAddress = 'DELETE FROM addresses WHERE id = ?';
//         await pool.query(sqlDeleteAddress, [address_id]);

//         const sqlDeletePassword = 'DELETE FROM passwords WHERE id = ?';
//         await pool.query(sqlDeletePassword, [password_id]);

//         console.log('User and associated address and password deleted successfully');
//     } catch (err) {
//         console.error('Error deleting user:', err);
//         throw err;
//     }
// }

// async function updateUser(id, username, email, phone, street, city, password) {
//     try {
//         // Update user details
//         const sqlUpdateUser = 'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?';
//         await pool.query(sqlUpdateUser, [username, email, phone, id]);

//         // Get address_id and password_id for the user
//         const sqlGetIds = 'SELECT address_id, password_id FROM users WHERE id = ?';
//         const [result] = await pool.query(sqlGetIds, [id]);
//         const { address_id, password_id } = result[0];

//         // Update address details
//         const sqlUpdateAddress = 'UPDATE addresses SET street = ?, city = ? WHERE id = ?';
//         await pool.query(sqlUpdateAddress, [street, city, address_id]);

//         // Update password details
//         const sqlUpdatePassword = 'UPDATE passwords SET password1 = ? WHERE id = ?';
//         await pool.query(sqlUpdatePassword, [password, password_id]);

//         console.log('User and associated address and password updated successfully');
//     } catch (err) {
//         console.error('Error updating user:', err);
//         throw err;
//     }
// }

// module.exports = { updateUser, getUser, getUsers, deleteUser, createUser, isUserExists, getUserByEmail,signup };
module.exports = { updateUserByEmail, getUserByEmail, signup ,createPatient,createVolunteer,isUserExists};

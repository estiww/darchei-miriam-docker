const pool = require('../db.js');

async function getUsers() {
    try {
        const sql = 'SELECT users.*, addresses.street, addresses.city FROM users INNER JOIN addresses ON users.address_id = addresses.id';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT users.*, addresses.street, addresses.city FROM users INNER JOIN addresses ON users.address_id = addresses.id WHERE users.id = ?';
        const [result] = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function getboolianByMail(mail) {
    try {
        const sql = 'SELECT UserTable.Mail WHERE UserTable.Mail = ?';
        const [result] = await pool.query(sql, [mail]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function signup(email, hashedPassword) {
    try {
        console.log(5)
      // Insert password into PasswordTable
      const insertPasswordSql = 'INSERT INTO PasswordTable (PasswordValue) VALUES (?)';
      const [passwordResult] = await pool.query(insertPasswordSql, [hashedPassword]);
      const passwordId = passwordResult.insertId;
      console.log(passwordId)

      // Insert user into UserTable
      const insertUserSql = `
      INSERT INTO UserTable (PasswordId, Mail, FirstName, LastName, AddressId, Phone, RoleId) 
      VALUES (?, ?, NULL, NULL, NULL, NULL, NULL)`;
    const [userResult] = await pool.query(insertUserSql, [passwordId, email]);
    console.log(userResult)

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
            PasswordTable.PasswordValue,
            RoleTable.RoleName
        FROM UserTable
        INNER JOIN PasswordTable ON UserTable.PasswordId = PasswordTable.PasswordId
        INNER JOIN RoleTable ON UserTable.RoleId = RoleTable.RoleId
        WHERE UserTable.Mail = ?;
    `;
        const [result] = await pool.query(sql, [email]);
        console.log(result) ;
        return result[0]; // Assuming the email is unique, return the first (and only) user
    } catch (err) {
        throw err;
    }
}
async function refreshToken(userId, refreshToken) {
    try {
        const updateSql = 'UPDATE RefreshTokenTable SET RefreshToken = ? WHERE UserId = ?';
        const [result] = await pool.query(updateSql, [refreshToken, userId]);
        // אם אף שורה לא עודכנה, מכניסים רשומה חדשה
        if (result.affectedRows === 0) {
            const insertSql = 'INSERT INTO RefreshTokenTable (UserId, RefreshToken) VALUES (?, ?)';
            const [insertResult] = await pool.query(insertSql, [userId, refreshToken]);
            console.log('Refresh token inserted:', insertResult);
        } else {
            console.log('Refresh token updated:', result);
        }
    } catch (err) {
        throw err;
    }
}

async function createUser(username, email, phone, street, city, password) {
    try {
        // Insert into addresses table
        const addressSql = 'INSERT INTO addresses (`street`, `city`) VALUES (?, ?)';
        const addressResult = await pool.query(addressSql, [street, city]);
        const addressId = addressResult[0].insertId;

        // Insert into passwords table
        const passwordSql = 'INSERT INTO passwords (`password1`) VALUES (?)';
        const passwordResult = await pool.query(passwordSql, [password]);
        const passwordId = passwordResult[0].insertId;

        // Insert into users table with foreign keys
        const userSql = 'INSERT INTO users (`username`, `email`, `phone`, `address_id`, `password_id`) VALUES (?, ?, ?, ?, ?)';
        const userResult = await pool.query(userSql, [username, email, phone, addressId, passwordId]);

        return userResult[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(id) {
    try {
        // Get address_id and password_id before deleting the user
        const sqlGetIds = 'SELECT address_id, password_id FROM users WHERE id = ?';
        const [result] = await pool.query(sqlGetIds, [id]);
        const { address_id, password_id } = result[0];

        // Delete the user
        const sqlDeleteUser = 'DELETE FROM users WHERE id = ?';
        await pool.query(sqlDeleteUser, [id]);

        // Delete the associated address and password
        const sqlDeleteAddress = 'DELETE FROM addresses WHERE id = ?';
        await pool.query(sqlDeleteAddress, [address_id]);

        const sqlDeletePassword = 'DELETE FROM passwords WHERE id = ?';
        await pool.query(sqlDeletePassword, [password_id]);

        console.log('User and associated address and password deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id, username, email, phone, street, city, password) {
    try {
        // Update user details
        const sqlUpdateUser = 'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?';
        await pool.query(sqlUpdateUser, [username, email, phone, id]);

        // Get address_id and password_id for the user
        const sqlGetIds = 'SELECT address_id, password_id FROM users WHERE id = ?';
        const [result] = await pool.query(sqlGetIds, [id]);
        const { address_id, password_id } = result[0];

        // Update address details
        const sqlUpdateAddress = 'UPDATE addresses SET street = ?, city = ? WHERE id = ?';
        await pool.query(sqlUpdateAddress, [street, city, address_id]);

        // Update password details
        const sqlUpdatePassword = 'UPDATE passwords SET password1 = ? WHERE id = ?';
        await pool.query(sqlUpdatePassword, [password, password_id]);

        console.log('User and associated address and password updated successfully');
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

module.exports = { updateUser, getUser, getUsers, deleteUser, createUser, getboolianByMail, getUserByEmail,refreshToken,signup };
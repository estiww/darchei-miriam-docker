const model = require('../models/usersModels');
const bcrypt = require('bcryptjs');

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

async function authenticate(email, password) {
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        return model.authenticate(email, encryptedPassword);
        
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



module.exports = { create, getAll, getById, deleteUser, update, getByUsername, authenticate }


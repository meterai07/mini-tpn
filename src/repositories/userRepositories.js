const User = require('../database/schemas/user');
const { encrypt, decrypt } = require('../utils/crypto');

exports.getUserByEmail = async (email) => {
    const users = await User.find();
    return users.find((user) => user.email === email);
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.getAllUsers = async () => {
    return await User.find();
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};
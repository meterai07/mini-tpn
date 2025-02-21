const { getUserByEmail, createUser, getAllUsers } = require('../repositories/userRepositories');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');

exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return response(res, 400, 'User already exists');
        }

        const user = await createUser({ email, password, fullname, phoneNumber });
        response(res, 201, 'User created successfully', user);
    } catch (error) {
        response(res, 500, error.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return response(res, 400, 'Invalid credentials');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response(res, 400, 'Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        response(res, 200, 'Login successful', { token });
    } catch (error) {
        response(res, 500, error.message);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        response(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        response(res, 500, error.message);
    }
};
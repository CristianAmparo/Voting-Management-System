const db = require('../db');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Get list of users
const getUsers = asyncHandler(async (req, res) => {
    const query = 'SELECT * FROM tbl_users';
    const [results] = await db.promise().query(query);
    res.json(results);
});

// Register a user - POST
const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    try {
        const query1 = 'SELECT * FROM tbl_users WHERE username = ?';
        const [userExist] = await db.promise().execute(query1, [username]);

        if (userExist.length > 0) {
            return res.status(400).json({ error: 'User Already Exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO tbl_users (name, username, password) VALUES (?, ?, ?)';
        await db.promise().execute(query, [name, username, hashedPassword]);

        return res.json({ message: 'Registration Successful' });
    } catch (error) {
        console.error('Error creating a user: ', error);
        return res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

// Login a user - POST
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    const query = 'SELECT * FROM tbl_users WHERE username = ?';
    const [user] = await db.promise().execute(query, [username]);

    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
        res.status(201).json(user[0]);
    } else {
        res.status(400).json({ error: 'Invalid Username or Password' });
    }
});

// Update a user - PUT
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, username, password } = req.body;

    const query = 'UPDATE tbl_users SET name = ?, username = ?, password = ? WHERE id = ?';
    await db.promise().execute(query, [name, username, password, id]);

    res.json({ message: 'User Updated' });
});

// Delete a user - DELETE
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tbl_users WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'User Deleted' });
});

module.exports = {
    getUsers,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
};

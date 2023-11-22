const db = require('../db');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Get list of users/voters
const getUsers = asyncHandler(async (req, res) => {
    const query = 'SELECT * FROM tbl_users';
    const [results] = await db.promise().query(query);
    res.json(results);
});



// Get user account info
const getMe = asyncHandler(async (req, res) => {
    const { id } = req.params; // Change this line if needed
    const query = 'SELECT * FROM tbl_users WHERE id = ?';
    try {
        const [results] = await db.promise().execute(query, [id]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching user data: ', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});




// Register a user - POST
const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, username, password } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!image || !fname || !lname || !username || !password) {
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
        const name = `${fname} ${lname}`;
        const query = 'INSERT INTO tbl_users (image, name, username, password) VALUES (?, ?, ?, ?)';
        await db.promise().execute(query, [image, name, username, hashedPassword]);

        return res.json({ message: 'Registration Successful' });
    } catch (error) {
        console.error('Error creating a user: ', error);
        return res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});
// Update a user - PUT
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { image, fname, lname, username, password } = req.body;

    let newImage;

    if (image) {
        newImage = image;
    } else if (req.file && req.file.filename) {
        newImage = req.file.filename;
    }

    console.log(req.body, newImage);

    if (!newImage || !fname || !lname || !username || !password) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const name = `${fname} ${lname}`;
        const query = 'UPDATE tbl_users SET image=?, name=?, username=?, password=? WHERE id=?';


        const values = [newImage, name, username, hashedPassword, id];

        await db.promise().execute(query, values);

        return res.json({ message: 'Updated Successful' });
    } catch (error) {
        console.error('Error updating user: ', error);
        return res.status(500).json({ error: error });
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



// Delete a user - DELETE
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tbl_users WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'User Deleted' });
});

module.exports = {
    getUsers,
    getMe,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
};

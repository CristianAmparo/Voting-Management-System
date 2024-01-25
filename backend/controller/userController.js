const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



// Get list of users/voters
const getUsers = asyncHandler(async (req, res) => {
    // Extract query parameters
    const { page = 1, limit = 50, filterBy } = req.query;
    const offset = (page - 1) * limit;

    // Build the SQL query
    let query = 'SELECT * FROM tbl_users WHERE username NOT IN (?)';
    const queryParams = ['admin@gmail.com'];

    // Add filtering condition if filterBy is provided
    if (filterBy) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${filterBy}%`);
    }

    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));

    // Execute the query
    const [results] = await db.promise().query(query, queryParams);

    // Send the results as JSON
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
    const { fname, lname, username, password, password2 } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!image) {
        return res.status(400).json({ error: 'Please upload an image' });
    }

    if (!fname) {
        return res.status(400).json({ error: 'Please provide the first name' });
    }

    if (!lname) {
        return res.status(400).json({ error: 'Please provide the last name' });
    }

    if (!username) {
        return res.status(400).json({ error: 'Please provide the username' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Please provide the password' });
    }

    if (!password2) {
        return res.status(400).json({ error: 'Please retype your password' });
    }

    if (password !== password2) {
        return res.status(400).json({ error: 'Password do no match' });
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
    const { image, fname, lname, username, password, password2 } = req.body;

    let newImage;

    if (image) {
        newImage = image;
    } else if (req.file && req.file.filename) {
        newImage = req.file.filename;
    }

    if (!newImage) {
        return res.status(400).json({ error: 'Please upload an image' });
    }

    if (!fname) {
        return res.status(400).json({ error: 'Please provide the first name' });
    }

    if (!lname) {
        return res.status(400).json({ error: 'Please provide the last name' });
    }

    if (!username) {
        return res.status(400).json({ error: 'Please provide the username' });
    }

    if (!password) {
        return res.status(400).json({ error: 'Please provide the password' });
    }

    if (!password2) {
        return res.status(400).json({ error: 'Please retype your password' });
    }

    if (password !== password2) {
        return res.status(400).json({ error: 'Password do no match' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const name = `${fname} ${lname}`;
        const query = 'UPDATE tbl_users SET image=?, name=?, username=?, password=? WHERE id=?';

        const values = [newImage, name, username, hashedPassword, id];

        await db.promise().execute(query, values);

        return res.json({ message: 'Updated Successfully' });
    } catch (error) {
        console.error('Error updating user: ', error);
        return res.status(500).json({ error: error });
    }

});


// Login a user - POST
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide both username and password' });
        }

        const query = 'SELECT * FROM tbl_users WHERE username = ?';
        const [user] = await db.promise().execute(query, [username]);

        if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
            const token = jwt.sign(
                { id: user[0].id, username: user[0].username },
                'samplekey',
                {
                    expiresIn: '24h', // Token expiration time
                }
            );

            res.status(201).json({ user: user[0], token });
        } else {
            res.status(400).json({ error: 'Incorrect email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error });
    }
});



// Delete a user - DELETE
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Use a transaction to ensure atomicity (both deletes succeed or fail together)
    await db.promise().beginTransaction();

    try {
        // Delete user from tbl_users
        const deleteUserQuery = 'DELETE FROM tbl_users WHERE id = ?';
        await db.promise().execute(deleteUserQuery, [id]);

        // Delete related votes from tbl_votes
        const deleteVotesQuery = 'DELETE FROM tbl_vote WHERE user_id = ?';
        await db.promise().execute(deleteVotesQuery, [id]);

        // Commit the transaction if both deletes succeed
        await db.promise().commit();

        res.json({ message: 'User Deleted' });
    } catch (error) {
        // Rollback the transaction if there's an error
        await db.promise().rollback();
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = {
    getUsers,
    getMe,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
};

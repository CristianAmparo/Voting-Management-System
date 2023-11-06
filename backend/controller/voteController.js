const db = require('../db');
const asyncHandler = require('express-async-handler');

// Get list of votes
const getVote = asyncHandler(async (req, res) => {
    const query = 'SELECT * FROM tbl_vote';
    const [results] = await db.promise().query(query);
    res.json(results);
});

// Get user vote for preview
const myVote = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const query = 'SELECT * FROM tbl_vote WHERE user_id = ?';
    const [results] = await db.promise().query(query, [user_id]);
    res.json(results);
});

// Register a vote - POST
const addVote = asyncHandler(async (req, res) => {
    const { user_id, president, vice, secretary, treasurer, first_rep } = req.body;

    if (!user_id || !president || !vice || !secretary || !treasurer || !first_rep) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    const query = 'INSERT INTO tbl_vote (user_id, president, vice, secretary, treasurer, first_rep) VALUES (?, ?, ?, ?, ?, ?';

    try {
        await db.promise().execute(query, [user_id, president, vice, secretary, treasurer, first_rep]);
        res.json({ message: 'Vote submitted successfully' });
    } catch (err) {
        console.error('Error creating a vote: ', err);
        res.status(500).json({ error: 'An error occurred. Please try again' });
    }
});

// Update a vote - PUT
const updateVote = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const { president, vice, secretary, treasurer, first_rep } = req.body;

    if (!user_id || !president || !vice || !secretary || !treasurer || !first_rep) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    const query = 'UPDATE tbl_vote SET president = ?, vice = ?, secretary = ?, treasurer = ?, first_rep = ? WHERE user_id = ?';

    try {
        await db.promise().query(query, [president, vice, secretary, treasurer, first_rep, user_id]);
        res.json({ message: 'Vote Updated' });
    } catch (err) {
        console.error('Error updating a vote: ', err);
        res.status(500).json({ error: 'An error occurred. Please try again' });
    }
});

module.exports = {
    getVote,
    myVote,
    addVote,
    updateVote
};

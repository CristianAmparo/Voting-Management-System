const db = require('../db');
const asyncHandler = require('express-async-handler');

// Get list of votes
const getVote = asyncHandler(async (req, res) => {
    const query = 'SELECT * FROM tbl_vote';
    const [results] = await db.promise().query(query);
    res.json(results);
});
// Count all votes for Each candidates on each position
const countVote = asyncHandler(async (req, res) => {
    const query = `
        SELECT
            tbl_candidates.name,
            tbl_candidates.position,
            COUNT(tbl_vote.id) AS vote_count
        FROM
            tbl_candidates
        LEFT JOIN
            tbl_vote
         ON
            tbl_candidates.name = tbl_vote.president
            OR tbl_candidates.name = tbl_vote.vice
            OR tbl_candidates.name = tbl_vote.secretary
            OR tbl_candidates.name = tbl_vote.treasurer
            OR tbl_candidates.name = tbl_vote.first_rep
        GROUP BY
            tbl_candidates.name,
            tbl_candidates.position
        ORDER BY
            CASE 
                WHEN tbl_candidates.position = 'President' THEN 1
                WHEN tbl_candidates.position = 'Vice' THEN 2
                WHEN tbl_candidates.position = 'Secretary' THEN 3
                ELSE 4
            END,
            tbl_candidates.position ASC; `;
    const [results] = await db.promise().query(query);
    res.json(results);
});

const countTotalVotes = asyncHandler(async (req, res) => {
    const query = `SELECT COUNT(tbl_vote.id) AS votes_count from tbl_vote;`;
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
    countVote,
    countTotalVotes,
    myVote,
    addVote,
    updateVote
};

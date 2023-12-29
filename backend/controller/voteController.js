const db = require('../db');
const asyncHandler = require('express-async-handler');
const moment = require('moment')

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
            tbl_candidates.id,
            tbl_candidates.name,
            tbl_candidates.position,
            tbl_candidates.image,
            tbl_candidates.platform,
            tbl_candidates.credentials,
            tbl_candidates.partylist,
            COUNT(tbl_vote.id) AS vote_count
        FROM
            tbl_candidates
        LEFT JOIN
            tbl_vote
        ON
            tbl_candidates.name = tbl_vote.President
            OR tbl_candidates.name = tbl_vote.Vice_President
            OR tbl_candidates.name = tbl_vote.Secretary
            OR tbl_candidates.name = tbl_vote.Treasurer
            OR tbl_candidates.name = tbl_vote.Auditor
            OR tbl_candidates.name = tbl_vote.Peace_Officer
        GROUP BY
            tbl_candidates.name,
            tbl_candidates.position
        ORDER BY
            CASE
                WHEN tbl_candidates.position = 'President' THEN 1
                WHEN tbl_candidates.position = 'Vice_President' THEN 2
                WHEN tbl_candidates.position = 'Secretary' THEN 3
                WHEN tbl_candidates.position = 'Treasurer' THEN 4
                WHEN tbl_candidates.position = 'Auditor' THEN 5
                ELSE 6
            END,
            tbl_candidates.name ASC;;
             `;
    const [results] = await db.promise().query(query);
    res.json(results);
});

//Count all votes
const countTotalVotes = asyncHandler(async (req, res) => {
    const query = `SELECT COUNT(tbl_vote.id) AS votes_count from tbl_vote;`;
    const [results] = await db.promise().query(query);
    res.json(results);
});

const countTotalVoters = asyncHandler(async (req, res) => {
    const query = `SELECT COUNT(tbl_users.id) AS voters_count from tbl_users WHERE username NOT IN (\'admin@gmail.com\');`;
    const [results] = await db.promise().query(query);
    res.json(results);
});

//Election End
const voteEnd = asyncHandler(async (req, res) => {
    // Assuming you have a table called "election_settings" with columns "start_date" and "end_date"
    const selectQuery = `SELECT start_date, end_date FROM election_settings WHERE id = 1`;

    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error('Error retrieving election settings:', err);
            res.status(500).json({ message: 'Error retrieving election settings' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Election settings not found' });
        } else {
            const electionEndDate = moment(result[0].end_date).format('YYYY-MM-DDTHH:mm');
            const electionStartDate = moment(result[0].start_date).format('YYYY-MM-DDTHH:mm');
            const currentTime = moment().format('YYYY-MM-DDTHH:mm');
            const remainingTime = moment(electionEndDate).diff(currentTime);

            res.json({ remainingTime, electionEndDate, electionStartDate });
        }
    });
});

const updateVoteEnd = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.body;

    // Assuming you have a table called "election_settings" with columns "start_date" and "end_date"
    const updateQuery = `UPDATE election_settings SET start_date = ?, end_date = ? WHERE id = 1`;

    db.query(updateQuery, [startDate, endDate], (err, result) => {
        if (err) {
            console.error('Error updating election settings:', err);
            res.status(500).json({ message: 'Error updating election settings' });
        } else {
            res.json({ message: 'Election duration settings updated successfully' });
        }
    });
});


// Get user vote for preview
const myVote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tbl_vote WHERE user_id = ?';
    const [results] = await db.promise().query(query, [id]);
    if (results.length > 0) {
        res.json(results);
    } else {
        res.json(false);
    }

});


// Register a vote - POST
const addVote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { President, Vice_President, Secretary, Treasurer, Auditor, Peace_Officer } = req.body;

    // Validate the input
    if (!President || !Vice_President || !Secretary || !Treasurer || !Auditor || !Peace_Officer) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    try {
        // Check if the user has already voted
        const query1 = 'SELECT * FROM tbl_vote WHERE user_id = ?';
        const [voteExist] = await db.promise().execute(query1, [id]);

        if (voteExist.length > 0) {
            return res.status(400).json({ error: 'You already voted' });
        }

        // Insert the vote into the database
        const query = 'INSERT INTO tbl_vote (user_id, President, Vice_President, Secretary, Treasurer, Auditor, Peace_Officer) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await db.promise().execute(query, [id, President, Vice_President, Secretary, Treasurer, Auditor, Peace_Officer]);

        // Respond with success
        res.json({ message: 'Vote submitted successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error creating a vote: ', err);
        res.status(500).json({ error: err });
    }
});


// Update a vote - PUT
const updateVote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { President, Vice_President, Secretary, Treasurer, Auditor, Peace_Officer } = req.body;

    if (!President || !Vice_President || !Secretary || !Treasurer || !Auditor || !Peace_Officer) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    const query = 'UPDATE tbl_vote SET President = ?, Vice_President = ?, Secretary = ?, Treasurer = ?, Auditor = ?, Peace_Officer = ? WHERE user_id = ?';

    try {
        await db.promise().query(query, [President, Vice_President, Secretary, Treasurer, Auditor, Peace_Officer, id]);
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
    countTotalVoters,
    myVote,
    addVote,
    updateVote,
    voteEnd,
    updateVoteEnd
};

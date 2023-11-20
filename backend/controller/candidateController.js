const db = require('../db');
const asyncHandler = require('express-async-handler');


// Get list of Candidates
const getCandidates = asyncHandler(async (req, res) => {
    const [results] = await db.promise().query('SELECT * FROM tbl_candidates');
    res.json(results);
});

// Get selected Candidate
const getCandidate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [results] = await db.promise().query('SELECT * FROM tbl_candidates WHERE id = ?', [id]);
    res.json(results);
});

// Add candidate - POST
const addCandidate = asyncHandler(async (req, res) => {
    const { name, position, partylist, platform, credentials } = req.body;

    const image = req.file ? req.file.filename : null;

    // Check if required fields are provided
    if (!name || !position || !image || !partylist || !platform || !credentials) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    try {
        const query = 'INSERT INTO tbl_candidates (name, position, image, platform, credentials, partylist) VALUES (?, ?, ?, ?, ?, ?)'
        const result = await db.promise().query(query, [name, position, image, platform, credentials, partylist]
        );

        // Assuming the SQL query was successful
        res.json({ message: 'Candidate Added', insertedId: result[0].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update candidate - PUT
const updateCandidate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, position, partylist, image, platform, credentials } = req.body;


    if (image) {
        newImage = image
    } else {
        newImage = req.file.filename
    }


    if (!name || !position || !newImage || !partylist || !platform || !credentials) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    await db.promise().execute('UPDATE tbl_candidates SET name = ?, position = ?, image = ?, platform = ?, credentials = ?, partylist = ? WHERE id = ?', [name, position, newImage, platform, credentials, partylist, id]);
    res.json({ message: 'Candidate Updated' });
});

// Delete candidate - DELETE
const deleteCandidate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await db.promise().execute('DELETE FROM tbl_candidates WHERE id = ?', [id]);
    res.json({ message: 'Candidate Deleted' });
});

module.exports = { getCandidates, getCandidate, addCandidate, updateCandidate, deleteCandidate };

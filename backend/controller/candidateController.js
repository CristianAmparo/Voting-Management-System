const db = require('../db');
const asyncHandler = require('express-async-handler');

// Get list of Candidates
const getCandidates = asyncHandler(async (req, res) => {
    const [results] = await db.promise().query('SELECT * FROM tbl_candidates');
    res.json(results);
});

// Add candidate - POST
const addCandidate = asyncHandler(async (req, res) => {
    const { name, position, image, platform, credentials } = req.body;
    if (!name || !position || !image || !platform || !credentials) {
        return res.status(400).json({ error: 'Please fill out all the fields' });
    }

    await db.promise().execute('INSERT INTO tbl_candidates (name, position, image, platform, credentials) VALUES (?, ?, ?, ?, ?)', [name, position, image, platform, credentials]);
    res.json({ message: 'Candidate Added' });
});

// Update candidate - PUT
const updateCandidate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, position, image, platform, credentials } = req.body;

    await db.promise().execute('UPDATE tbl_candidates SET name = ?, position = ?, image = ?, platform = ?, credentials = ? WHERE id = ?', [name, position, image, platform, credentials, id]);
    res.json({ message: 'Candidate Updated' });
});

// Delete candidate - DELETE
const deleteCandidate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await db.promise().execute('DELETE FROM tbl_candidates WHERE id = ?', [id]);
    res.json({ message: 'Candidate Deleted' });
});

module.exports = { getCandidates, addCandidate, updateCandidate, deleteCandidate };

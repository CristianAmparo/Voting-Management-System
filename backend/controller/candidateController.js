const db = require('../db');
const asyncHandler = require('express-async-handler');


// Get list of Candidates
const getCandidates = asyncHandler(async (req, res) => {
    // Extract query parameters
    const { page = 1, limit = 50, filterBy } = req.query;
    const offset = (page - 1) * limit;

    // Build the SQL query
    let query = `SELECT * FROM tbl_candidates ORDER BY
    CASE
        WHEN tbl_candidates.position = 'President' THEN 1
        WHEN tbl_candidates.position = 'Vice_President' THEN 2
        WHEN tbl_candidates.position = 'Secretary' THEN 3
        WHEN tbl_candidates.position = 'Treasurer' THEN 4
        WHEN tbl_candidates.position = 'Auditor' THEN 5
        ELSE 6
    END`;

    const queryParams = [];

    // Add filtering condition if filterBy is provided
    if (filterBy) {
        query += ' WHERE name LIKE ?';
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
    if (!name) {
        return res.status(400).json({ error: 'Please input the candidate name' });
    }
    if (!position) {
        return res.status(400).json({ error: 'Please input the candidate position' });
    }
    if (!image) {
        return res.status(400).json({ error: 'Please input the candidate image' });
    }
    if (!partylist) {
        return res.status(400).json({ error: 'Please input the candidate partylist' });
    }
    if (!platform) {
        return res.status(400).json({ error: 'Please input the candidate platform' });
    }
    if (!credentials) {
        return res.status(400).json({ error: 'Please input the candidate credentials' });
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


    if (!name) {
        return res.status(400).json({ error: 'Please input the name of candidate' });
    }
    if (!position) {
        return res.status(400).json({ error: 'Please input the candidate position' });
    }
    if (!newImage) {
        return res.status(400).json({ error: 'Please input the candidate image' });
    }
    if (!partylist) {
        return res.status(400).json({ error: 'Please input the candidate partylist' });
    }
    if (!platform) {
        return res.status(400).json({ error: 'Please input the candidate platform' });
    }
    if (!credentials) {
        return res.status(400).json({ error: 'Please input the candidate credentials' });
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

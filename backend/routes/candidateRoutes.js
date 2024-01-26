const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware')
const { getCandidates, getCandidate, addCandidate, updateCandidate, deleteCandidate } = require('../controller/candidateController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware')

router.get('/', authenticateUser, getCandidates);
router.get('/:id', authenticateUser, authorizeAdmin, getCandidate);
router.post('/', upload.single('image'), addCandidate);
router.put('/:id', upload.single('image'), updateCandidate);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteCandidate);

module.exports = router;

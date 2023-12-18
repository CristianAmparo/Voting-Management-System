const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware')
const { getCandidates, getCandidate, addCandidate, updateCandidate, deleteCandidate } = require('../controller/candidateController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware')



router.get('/', authenticateUser, authorizeAdmin, getCandidates);
router.get('/candidate/:id', getCandidate);
router.post('/', upload.single('image'), authenticateUser, authorizeAdmin, addCandidate);
router.put('/:id', upload.single('image'), authenticateUser, authorizeAdmin, updateCandidate);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteCandidate);

module.exports = router;

const express = require('express')
const router = express.Router()
const { getCandidates, addCandidate, updateCandidate, deleteCandidate } = require('../controller/candidateController')


router.get('/', getCandidates);// See all votes
router.post('/', addCandidate);// Add vote
router.put('/:id', updateCandidate);// Update vote
router.delete('/:id', deleteCandidate);// Update vote


module.exports = router
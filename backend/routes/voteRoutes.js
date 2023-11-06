const express = require('express')
const router = express.Router()
const { getVote, myVote, addVote, updateVote } = require('../controller/voteController')


router.get('/', getVote);// See all votes
router.post('/', addVote);// Add vote
router.get('/:user_id', myVote);// See all votes
router.put('/:user_id', updateVote);// Update vote

module.exports = router
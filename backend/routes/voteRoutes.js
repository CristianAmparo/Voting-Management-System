const express = require('express')
const router = express.Router()
const { getVote, myVote, countTotalVotes, addVote, updateVote, countVote, voteEnd, updateVoteEnd } = require('../controller/voteController')


router.get('/', getVote);// See all votes
router.post('/', addVote);// Add vote
router.get('/count', countVote);// See all votes
router.get('/totalVotes', countTotalVotes);// See all votes
router.get('/voteEnd', voteEnd);// See all votes
router.put('/voteEnd', updateVoteEnd);// Update end of election
router.get('/:user_id', myVote);// See all votes
router.put('/:user_id', updateVote);// Update vote

module.exports = router
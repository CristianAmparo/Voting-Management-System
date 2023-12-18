const express = require('express')
const router = express.Router()
const { getVote, myVote, countTotalVotes, countTotalVoters, addVote, updateVote, countVote, voteEnd, updateVoteEnd } = require('../controller/voteController')
const { authenticateUser, authorizeAdmin, authorizeUser } = require('../middleware/authMiddleware')


router.get('/', authenticateUser, authorizeAdmin, getVote);// See all votes
router.post('/:user_id', authenticateUser, authorizeUser, addVote);// Add vote
router.get('/count', authenticateUser, authorizeAdmin, countVote);// See all votes
router.get('/totalVotes', authenticateUser, authorizeAdmin, countTotalVotes);// See total votes
router.get('/totalVoters', authenticateUser, authorizeAdmin, countTotalVoters);// See total voters/Users
router.get('/voteEnd', authenticateUser, authorizeAdmin, voteEnd);// See end of election
router.put('/voteEnd', authenticateUser, authorizeAdmin, updateVoteEnd);// Update end of election
router.get('/:user_id', authenticateUser, authorizeUser, myVote);// See all votes
router.put('/:user_id', authenticateUser, authorizeUser, updateVote);// Update vote

module.exports = router
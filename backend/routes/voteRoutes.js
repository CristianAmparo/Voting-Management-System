const express = require('express')
const router = express.Router()
const { getVote, myVote, countTotalVotes, countTotalVoters, addVote, updateVote, countVote, voteEnd, updateVoteEnd } = require('../controller/voteController')
const { authenticateUser, authorizeAdmin, authorizeUser } = require('../middleware/authMiddleware')


router.get('/voteEnd', authenticateUser, voteEnd);// See end of election
router.get('/', authenticateUser, authorizeAdmin, getVote);// See all votes
router.get('/count', authenticateUser, authorizeAdmin, countVote);// count all votes for each candidates on each position
router.get('/totalVotes', authenticateUser, authorizeAdmin, countTotalVotes);// See total votes
router.get('/totalVoters', authenticateUser, authorizeAdmin, countTotalVoters);// See total voters/Users
router.put('/voteEnd', authenticateUser, authorizeAdmin, updateVoteEnd);// Update end of election
router.get('/:id', authenticateUser, authorizeUser, myVote);// See user vote
router.post('/:id', authenticateUser, authorizeUser, addVote);// Add vote
router.put('/:id', authenticateUser, authorizeUser, updateVote);// Update user vote

module.exports = router
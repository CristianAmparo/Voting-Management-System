const express = require('express')
const router = express.Router()
const { getVote, myVote, countTotalVotes, countTotalVoters, addVote, updateVote, countVote, voteEnd, updateVoteEnd } = require('../controller/voteController')
const { authenticateUser, authorizeAdmin, authorizeUser } = require('../middleware/authMiddleware')


router.get('/', authenticateUser, authorizeAdmin, getVote);// See all votes
router.post('/:id', authenticateUser, authorizeUser, addVote);// Add vote
router.get('/:id', authenticateUser, authorizeUser, myVote);// See user vote
router.put('/:id', authenticateUser, authorizeUser, updateVote);// Update user vote
router.get('/count', authenticateUser, authorizeAdmin, countVote);// count all votes for each candidates on each position
router.get('/totalVotes', authenticateUser, authorizeAdmin, countTotalVotes);// See total votes
router.get('/totalVoters', authenticateUser, authorizeAdmin, countTotalVoters);// See total voters/Users
router.get('/voteEnd', authenticateUser, authorizeAdmin, voteEnd);// See end of election
router.put('/voteEnd', authenticateUser, authorizeAdmin, updateVoteEnd);// Update end of election

module.exports = router
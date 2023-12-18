const express = require('express')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()
const { getUsers, loginUser, registerUser, updateUser, deleteUser, getMe } = require('../controller/userController')
const { authenticateUser, authorizeAdmin, authorizeUser } = require('../middleware/authMiddleware')


router.get('/', authenticateUser, authorizeAdmin, getUsers);// See all the user
router.get('/:id', authenticateUser, authorizeUser, getMe);// See user data
router.post('/login', loginUser);// login user
router.post('/', upload.single('image'), registerUser);// Add user
router.put('/:id', upload.single('image'), updateUser);// Update an user
router.delete('/:id', authenticateUser, authorizeAdmin, deleteUser);// Delete an user

module.exports = router
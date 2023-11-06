const express = require('express')
const router = express.Router()
const { getUsers, loginUser, registerUser, updateUser, deleteUser } = require('../controller/userController')


router.get('/', getUsers);// See all the user
router.post('/', registerUser);// Add user
router.post('/login', loginUser);// Add user
router.put('/:id', updateUser);// Update an user
router.delete('/:id', deleteUser);// Delete an user

module.exports = router